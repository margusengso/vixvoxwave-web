import { StoryCard } from '../../components/StoryCard'
import { getApprovedStories } from '../../lib/stories'

export const metadata = {
  title: 'Comic stories',
  description:
    'Read the ordered VixVoxWave comic stories, with accessible transcripts and long descriptions for every episode.',
  alternates: {
    canonical: '/stories/',
  },
  openGraph: {
    title: 'VixVoxWave comic stories',
    description:
      'Ordered fictional comic stories about perfectly timed room reactions.',
    url: '/stories/',
  },
}

export default function StoriesPage() {
  const stories = getApprovedStories()

  return (
    <main id="main-content">
      <header className="page-hero section-shell">
        <p className="eyebrow">Comic archive</p>
        <h1>Stories from the listening room.</h1>
        <p>
          Each comic has a permanent numbered place in the series, a
          descriptive URL, and an accessible transcript. The latest approved
          story appears first; new stories appear only after human review.
        </p>
      </header>

      <section className="story-grid section-shell" aria-label="Published stories">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </section>
    </main>
  )
}
