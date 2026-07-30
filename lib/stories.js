import hauntedHouse from '../content/stories/1-haunted-house.json'

const stories = Object.freeze([hauntedHouse])

export function getApprovedStories() {
  return stories
    .filter((story) => story.status === 'approved')
    .toSorted((left, right) => left.sequence - right.sequence)
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
  const index = approvedStories.findIndex(({ id }) => id === story.id)

  return {
    next: index >= 0 ? approvedStories[index + 1] ?? null : null,
    previous: index > 0 ? approvedStories[index - 1] : null,
  }
}
