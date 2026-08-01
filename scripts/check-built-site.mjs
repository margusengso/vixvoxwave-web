import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputRoot = path.join(projectRoot, 'out')

const pages = [
  {
    file: 'index.html',
    canonical: 'https://vixvoxwave.com/',
    required: [
      'Let the room',
      'support.vixvoxwave@gmail.com',
      'Soon available',
      '/stories/1/haunted-house/',
      '/media/brand/vixvoxwave-app-icon-320.webp',
    ],
  },
  {
    file: 'stories/index.html',
    canonical: 'https://vixvoxwave.com/stories/',
    required: ['Comic archive', 'Haunted House', 'human review'],
  },
  {
    file: 'stories/1/haunted-house/index.html',
    canonical: 'https://vixvoxwave.com/stories/1/haunted-house/',
    required: [
      'Read a text version',
      'Comic description',
      'Exact panel transcript',
      'ComicStory',
      'Fictional comic',
      'Ghosts',
    ],
  },
  {
    file: 'privacy/index.html',
    canonical: 'https://vixvoxwave.com/privacy/',
    required: [
      'Privacy policy',
      'does not upload microphone audio',
      'does not send captured audio',
      'Children&#x27;s privacy',
      'support.vixvoxwave@gmail.com',
    ],
  },
  {
    file: 'support/index.html',
    canonical: 'https://vixvoxwave.com/support/',
    required: ['Tell us what the room did', 'support.vixvoxwave@gmail.com'],
  },
]

function fail(message) {
  throw new Error(message)
}

function decode(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
}

function matchMeta(html, name) {
  const patterns = [
    new RegExp(`<meta[^>]+name="${name}"[^>]+content="([^"]+)"`, 'i'),
    new RegExp(`<meta[^>]+content="([^"]+)"[^>]+name="${name}"`, 'i'),
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match) return decode(match[1])
  }

  return null
}

function matchCanonical(html) {
  const patterns = [
    /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i,
    /<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i,
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match) return decode(match[1])
  }

  return null
}

const titles = []
const descriptions = []

for (const page of pages) {
  const html = await readFile(path.join(outputRoot, page.file), 'utf8')
  const title = decode(html.match(/<title>([^<]+)<[/]title>/i)?.[1] ?? '')
  const description = matchMeta(html, 'description')
  const canonical = matchCanonical(html)

  if (!title || !description) {
    fail(`${page.file}: title and description are required in initial HTML`)
  }
  if (canonical !== page.canonical) {
    fail(`${page.file}: expected canonical ${page.canonical}, received ${canonical}`)
  }
  if (!html.includes('vixvoxwave-social-card.jpg') && page.file !== 'stories/1/haunted-house/index.html') {
    fail(`${page.file}: site social card is missing`)
  }
  if (!html.includes('/media/brand/vixvoxwave-logo-192.png')) {
    fail(`${page.file}: transparent VixVoxWave logo is missing`)
  }
  const requiredBrowserIcons = [
    '/favicon.ico',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/favicon-48x48.png',
    '/favicon.png',
    '/apple-touch-icon.png',
  ]
  if (requiredBrowserIcons.some((icon) => !html.includes(icon))) {
    fail(`${page.file}: canonical browser icons are missing`)
  }
  if (/vite|react logo|count is/i.test(html)) {
    fail(`${page.file}: starter content leaked into the build`)
  }

  for (const requiredText of page.required) {
    if (!html.toLowerCase().includes(requiredText.toLowerCase())) {
      fail(`${page.file}: missing required text "${requiredText}"`)
    }
  }

  if (
    page.file === 'stories/1/haunted-house/index.html' &&
    (!html.includes('<details') || /<details[^>]+open(?:[=> ])/i.test(html))
  ) {
    fail(`${page.file}: the accessible text version must use a closed details disclosure`)
  }

  titles.push(title)
  descriptions.push(description)
}

if (new Set(titles).size !== titles.length) {
  fail('Every checked route needs a unique title')
}
if (new Set(descriptions).size !== descriptions.length) {
  fail('Every checked route needs a unique description')
}

const notFound = await readFile(path.join(outputRoot, '404.html'), 'utf8')
if (!notFound.includes('Nothing answered here')) {
  fail('The static 404 page is missing')
}

const robots = await readFile(path.join(outputRoot, 'robots.txt'), 'utf8')
if (!robots.includes('Sitemap: https://vixvoxwave.com/sitemap.xml')) {
  fail('robots.txt must name the production sitemap')
}

const sitemap = await readFile(path.join(outputRoot, 'sitemap.xml'), 'utf8')
for (const page of pages) {
  if (!sitemap.includes(page.canonical)) {
    fail(`sitemap.xml is missing ${page.canonical}`)
  }
}

process.stdout.write(`Built-site checks passed for ${pages.length} pages plus 404 and discovery files.\n`)
