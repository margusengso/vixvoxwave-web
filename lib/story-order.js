export function sortStoriesNewestFirst(stories) {
  return [...stories].sort((left, right) => right.sequence - left.sequence)
}

export function getChronologicalStoryNeighbors(story, newestFirstStories) {
  const index = newestFirstStories.findIndex(({ id }) => id === story.id)

  return {
    next: index > 0 ? newestFirstStories[index - 1] : null,
    previous:
      index >= 0 ? newestFirstStories[index + 1] ?? null : null,
  }
}
