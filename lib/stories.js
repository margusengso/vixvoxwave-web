import hauntedHouse from '../content/stories/1-haunted-house.json'
import {
  getChronologicalStoryNeighbors,
  sortStoriesNewestFirst,
} from './story-order'

const stories = Object.freeze([hauntedHouse])

export function getApprovedStories() {
  return sortStoriesNewestFirst(
    stories.filter((story) => story.status === 'approved'),
  )
}

export function getStoryByRoute(sequence, slug) {
  const numericSequence = Number(sequence)

  return (
    getApprovedStories().find(
      (story) =>
        story.sequence === numericSequence &&
        story.slug === slug,
    ) ?? null
  )
}

export function getStoryHref(story) {
  return `/stories/${story.sequence}/${story.slug}/`
}

export function getStoryNeighbors(story) {
  const approvedStories = getApprovedStories()
  return getChronologicalStoryNeighbors(story, approvedStories)
}
