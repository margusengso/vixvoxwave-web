import Link from 'next/link'

import { getStoryHref } from '../lib/stories'
import { ComicPicture } from './ComicPicture'

export function StoryCard({ featured = false, story }) {
  const href = getStoryHref(story)

  return (
    <article className={`story-card${featured ? ' story-card--featured' : ''}`}>
      <Link className="story-card__image" href={href} tabIndex="-1" aria-hidden="true">
        <ComicPicture
          image={story.image}
          shortAlt=""
          sizes={featured ? '(max-width: 860px) 92vw, 520px' : '(max-width: 700px) 92vw, 360px'}
        />
      </Link>
      <div className="story-card__body">
        <p className="story-number">Story {story.sequence}</p>
        <h3>
          <Link href={href}>{story.title}</Link>
        </h3>
        <p>{story.dek}</p>
        <Link className="text-link" href={href}>
          Read the comic
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </article>
  )
}
