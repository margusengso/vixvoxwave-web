import { createHash } from 'node:crypto'
import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const storyDirectory = path.join(projectRoot, 'content', 'stories')
const publicDirectory = path.join(projectRoot, 'public')
const allowedStatuses = new Set(['draft', 'review', 'approved'])
const allowedTranscriptKinds = new Set(['caption', 'dialogue', 'screen', 'sound'])

function fail(message) {
  throw new Error(message)
}

function requireString(value, label, minimum = 1) {
  if (typeof value !== 'string' || value.trim().length < minimum) {
    fail(`${label} must be a string of at least ${minimum} characters`)
  }
}

function requireUnique(values, label) {
  const normalized = values.map((value) => String(value).trim().toLowerCase())
  if (new Set(normalized).size !== normalized.length) {
    fail(`${label} values must be unique`)
  }
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex')
}

function jpegDimensions(buffer) {
  if (buffer.readUInt16BE(0) !== 0xffd8) {
    fail('Invalid JPEG signature')
  }

  let offset = 2
  const frameMarkers = new Set([
    0xffc0,
    0xffc1,
    0xffc2,
    0xffc3,
    0xffc5,
    0xffc6,
    0xffc7,
    0xffc9,
    0xffca,
    0xffcb,
    0xffcd,
    0xffce,
    0xffcf,
  ])

  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1
      continue
    }

    const marker = buffer.readUInt16BE(offset)
    offset += 2

    if (marker === 0xffd9 || marker === 0xffda) {
      break
    }

    const segmentLength = buffer.readUInt16BE(offset)
    if (frameMarkers.has(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      }
    }

    offset += segmentLength
  }

  fail('JPEG dimensions could not be read')
}

function webpDimensions(buffer) {
  if (
    buffer.subarray(0, 4).toString('ascii') !== 'RIFF' ||
    buffer.subarray(8, 12).toString('ascii') !== 'WEBP'
  ) {
    fail('Invalid WebP signature')
  }

  const chunkType = buffer.subarray(12, 16).toString('ascii')

  if (chunkType === 'VP8X') {
    return {
      width: buffer.readUIntLE(24, 3) + 1,
      height: buffer.readUIntLE(27, 3) + 1,
    }
  }

  if (chunkType === 'VP8 ') {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    }
  }

  if (chunkType === 'VP8L') {
    const bits = buffer.readUInt32LE(21)
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >>> 14) & 0x3fff) + 1,
    }
  }

  fail(`Unsupported WebP chunk ${chunkType}`)
}

async function validateImage(image, label) {
  requireString(image.path, `${label}.path`)
  requireString(image.mimeType, `${label}.mimeType`)
  requireString(image.sha256, `${label}.sha256`, 64)

  const relativePath = image.path.replace(/^[/]+/, '')
  const filePath = path.join(publicDirectory, relativePath)
  const buffer = await readFile(filePath)
  const fileStats = await stat(filePath)

  if (fileStats.size !== image.bytes) {
    fail(`${label} byte count does not match ${image.path}`)
  }
  if (sha256(buffer) !== image.sha256) {
    fail(`${label} hash does not match ${image.path}`)
  }

  const dimensions =
    image.mimeType === 'image/jpeg'
      ? jpegDimensions(buffer)
      : image.mimeType === 'image/webp'
        ? webpDimensions(buffer)
        : fail(`${label} uses an unsupported MIME type`)

  if (dimensions.width !== image.width || dimensions.height !== image.height) {
    fail(`${label} dimensions do not match ${image.path}`)
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (['.git', '.next', 'node_modules', 'out'].includes(entry.name)) {
      continue
    }

    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath)))
    } else {
      files.push(entryPath)
    }
  }

  return files
}

async function validateRepositoryPolicy() {
  const files = await walk(projectRoot)
  const prohibited = files.filter((filePath) => {
    const relativePath = path.relative(projectRoot, filePath)
    return (
      relativePath === '.openai/hosting.json' ||
      relativePath === 'tsconfig.json' ||
      /[.](?:ts|tsx)$/.test(relativePath)
    )
  })

  if (prohibited.length > 0) {
    fail(`Prohibited TypeScript or Sites files found: ${prohibited.join(', ')}`)
  }
}

async function validateStories() {
  const storyFiles = (await readdir(storyDirectory))
    .filter((filename) => filename.endsWith('.json'))
    .sort()
  const stories = []

  for (const filename of storyFiles) {
    const filePath = path.join(storyDirectory, filename)
    const story = JSON.parse(await readFile(filePath, 'utf8'))

    if (!Number.isInteger(story.sequence) || story.sequence < 1) {
      fail(`${filename}: sequence must be a positive integer`)
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(story.slug)) {
      fail(`${filename}: slug must be lowercase and descriptive`)
    }
    if (filename !== `${story.sequence}-${story.slug}.json`) {
      fail(`${filename}: filename must match sequence and slug`)
    }
    if (!allowedStatuses.has(story.status)) {
      fail(`${filename}: unsupported status ${story.status}`)
    }

    requireString(story.title, `${filename}.title`, 4)
    requireString(story.seoTitle, `${filename}.seoTitle`, 12)
    requireString(story.description, `${filename}.description`, 70)
    requireString(story.dek, `${filename}.dek`, 40)
    requireString(story.shortAlt, `${filename}.shortAlt`, 20)
    requireString(story.summary, `${filename}.summary`, 100)
    requireString(story.longDescription, `${filename}.longDescription`, 120)
    requireString(story.disclosure, `${filename}.disclosure`, 60)

    if (!Array.isArray(story.bodyParagraphs) || story.bodyParagraphs.length < 2) {
      fail(`${filename}: at least two story paragraphs are required`)
    }
    if (!Array.isArray(story.panels) || story.panels.length === 0) {
      fail(`${filename}: at least one panel is required`)
    }

    story.panels.forEach((panel, index) => {
      if (panel.number !== index + 1) {
        fail(`${filename}: panel numbers must be contiguous`)
      }
      requireString(panel.heading, `${filename}.panels[${index}].heading`)
      requireString(
        panel.visualDescription,
        `${filename}.panels[${index}].visualDescription`,
        40,
      )
      if (!Array.isArray(panel.transcript) || panel.transcript.length === 0) {
        fail(`${filename}: panel ${panel.number} needs a transcript`)
      }
      panel.transcript.forEach((entry, entryIndex) => {
        if (!allowedTranscriptKinds.has(entry.kind)) {
          fail(`${filename}: panel ${panel.number} has an invalid transcript kind`)
        }
        requireString(
          entry.text,
          `${filename}.panels[${index}].transcript[${entryIndex}].text`,
        )
      })
    })

    if (story.status === 'approved') {
      if (story.review?.assetUseApproved !== true) {
        fail(`${filename}: an approved story needs explicit asset-use approval`)
      }
      if (story.review?.publicationRequiresCommitApproval !== true) {
        fail(`${filename}: the commit/publication approval gate is required`)
      }
    }

    const fallbackImage = {
      path: story.image.fallbackPath,
      width: story.image.width,
      height: story.image.height,
      mimeType: story.image.mimeType,
      bytes: story.image.bytes,
      sha256: story.image.sha256,
    }
    await validateImage(fallbackImage, `${filename}.image`)

    if (!Array.isArray(story.image.responsive) || story.image.responsive.length < 3) {
      fail(`${filename}: three responsive image sources are required`)
    }
    for (const [index, image] of story.image.responsive.entries()) {
      await validateImage(image, `${filename}.image.responsive[${index}]`)
    }

    stories.push(story)
  }

  requireUnique(stories.map((story) => story.id), 'Story ID')
  requireUnique(stories.map((story) => story.sequence), 'Story sequence')
  requireUnique(stories.map((story) => story.slug), 'Story slug')
  requireUnique(stories.map((story) => story.seoTitle), 'Story SEO title')
  requireUnique(stories.map((story) => story.description), 'Story description')

  return stories
}

async function validateProvenance() {
  const provenancePath = path.join(projectRoot, 'content', 'assets', 'provenance.json')
  const provenance = JSON.parse(await readFile(provenancePath, 'utf8'))

  if (!Array.isArray(provenance.assets) || provenance.assets.length === 0) {
    fail('Asset provenance must contain at least one record')
  }

  requireUnique(provenance.assets.map((asset) => asset.id), 'Asset provenance ID')

  for (const asset of provenance.assets) {
    requireString(asset.source, `${asset.id}.source`)
    requireString(asset.approval, `${asset.id}.approval`)
    const filePath = path.join(publicDirectory, asset.publicPath.replace(/^[/]+/, ''))
    const buffer = await readFile(filePath)
    if (sha256(buffer) !== asset.sha256) {
      fail(`${asset.id}: provenance hash does not match its public file`)
    }
  }
}

await validateRepositoryPolicy()
const stories = await validateStories()
await validateProvenance()

process.stdout.write(`Content checks passed for ${stories.length} story.\n`)
