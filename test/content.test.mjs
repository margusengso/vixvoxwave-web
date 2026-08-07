import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import {
  getChronologicalStoryNeighbors,
  sortStoriesNewestFirst,
} from '../lib/story-order.js'

const storyUrl = new URL('../content/stories/1-haunted-house.json', import.meta.url)
const story = JSON.parse(await readFile(storyUrl, 'utf8'))

test('Story 1 has a stable ordered descriptive route', () => {
  assert.equal(story.sequence, 1)
  assert.equal(story.slug, 'haunted-house')
  assert.equal(`/stories/${story.sequence}/${story.slug}/`, '/stories/1/haunted-house/')
})

test('Story 1 carries the human publication gates', () => {
  assert.equal(story.status, 'approved')
  assert.equal(story.review.assetUseApproved, true)
  assert.equal(story.review.publicationRequiresCommitApproval, true)
})

test('Story 1 has contiguous accessible panels', () => {
  assert.deepEqual(
    story.panels.map(({ number }) => number),
    [1, 2, 3, 4, 5, 6, 7, 8],
  )
  assert.ok(story.shortAlt.length >= 20)
  assert.ok(story.longDescription.length >= 120)
  assert.ok(story.panels.every((panel) => panel.transcript.length > 0))
})

test('Story 1 separates fiction from product claims', () => {
  assert.equal(story.storyType, 'fictional')
  assert.match(story.disclosure, /not a literal walkthrough/i)
  assert.match(story.disclosure, /not a promise/i)
})

test('Story collections display newest first without reversing chronology links', () => {
  const stories = [
    { id: 'story-1', sequence: 1 },
    { id: 'story-3', sequence: 3 },
    { id: 'story-2', sequence: 2 },
  ]
  const newestFirst = sortStoriesNewestFirst(stories)

  assert.deepEqual(
    newestFirst.map(({ sequence }) => sequence),
    [3, 2, 1],
  )
  assert.deepEqual(
    getChronologicalStoryNeighbors(stories[2], newestFirst),
    {
      next: stories[1],
      previous: stories[0],
    },
  )
})
