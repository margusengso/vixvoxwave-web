import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ComicPicture } from '../../../../components/ComicPicture'
import { JsonLd } from '../../../../components/JsonLd'
import {
  getApprovedStories,
  getStoryByRoute,
  getStoryHref,
  getStoryNeighbors,
} from '../../../../lib/stories'
import { SITE_NAME, absoluteUrl } from '../../../../lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return getApprovedStories().map((story) => ({
    sequence: String(story.sequence),
    slug: story.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { sequence, slug } = await params
  const story = getStoryByRoute(sequence, slug)

  if (!story) {
    return {}
  }

  const href = getStoryHref(story)

  return {
    title: {
      absolute: story.seoTitle,
    },
    description: story.description,
    alternates: {
      canonical: href,
    },
    openGraph: {
      type: 'article',
      title: story.seoTitle,
      description: story.description,
      url: href,
      images: [
        {
          url: story.image.fallbackPath,
          width: story.image.width,
          height: story.image.height,
          alt: story.shortAlt,
          type: story.image.mimeType,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: story.seoTitle,
      description: story.description,
      images: [story.image.fallbackPath],
    },
  }
}

const transcriptKindLabels = {
  caption: 'Caption',
  dialogue: 'Dialogue',
  screen: 'Illustrated screen',
  sound: 'Sound',
}

export default async function StoryPage({ params }) {
  const { sequence, slug } = await params
  const story = getStoryByRoute(sequence, slug)

  if (!story) {
    notFound()
  }

  const href = getStoryHref(story)
  const { next, previous } = getStoryNeighbors(story)
  const imageUrl = absoluteUrl(story.image.fallbackPath)

  const storyJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': absoluteUrl(`${href}#webpage`),
        url: absoluteUrl(href),
        name: story.seoTitle,
        description: story.description,
        inLanguage: story.language,
        mainEntity: {
          '@id': absoluteUrl(`${href}#comic`),
        },
        breadcrumb: {
          '@id': absoluteUrl(`${href}#breadcrumbs`),
        },
      },
      {
        '@type': 'ComicStory',
        '@id': absoluteUrl(`${href}#comic`),
        name: story.title,
        headline: story.dek,
        abstract: story.summary,
        position: story.sequence,
        inLanguage: story.language,
        isPartOf: {
          '@type': 'ComicSeries',
          name: `${SITE_NAME} Stories`,
          url: absoluteUrl('/stories/'),
        },
        image: {
          '@type': 'ImageObject',
          contentUrl: imageUrl,
          width: story.image.width,
          height: story.image.height,
          encodingFormat: story.image.mimeType,
          caption: story.shortAlt,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': absoluteUrl(`${href}#breadcrumbs`),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Stories',
            item: absoluteUrl('/stories/'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `Story ${story.sequence}: ${story.title}`,
            item: absoluteUrl(href),
          },
        ],
      },
    ],
  }

  return (
    <main id="main-content">
      <article className="comic-page section-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/stories/">Stories</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Story {story.sequence}</span>
        </nav>

        <header className="comic-header">
          <div>
            <p className="eyebrow">VixVoxWave story {story.sequence}</p>
            <h1>{story.title}</h1>
            <p className="comic-header__dek">{story.dek}</p>
          </div>
          <div className="comic-header__notes">
            <p>
              <strong>Fictional comic</strong>
              <span>{story.contentNote}</span>
            </p>
          </div>
        </header>

        <figure className="comic-art">
          <ComicPicture
            eager
            image={story.image}
            shortAlt={`${story.shortAlt} A text version is available below.`}
          />
          <figcaption>
            Story {story.sequence}: {story.title}.
          </figcaption>
        </figure>

        <div className="comic-story-copy">
          <p className="comic-story-copy__summary">{story.summary}</p>
          {story.bodyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <aside className="disclosure" aria-label="Comic disclosure">
          <p className="eyebrow">Story note</p>
          <p>{story.disclosure}</p>
        </aside>

        <details className="transcript" id="transcript">
          <summary className="transcript__summary">
            <span>
              <span className="eyebrow">Accessibility</span>
              <strong>Read a text version</strong>
              <span>
                Optional description, dialogue, and illustrated-screen text.
              </span>
            </span>
            <span className="transcript__toggle" aria-hidden="true" />
          </summary>

          <div className="transcript__content">
            <section
              className="transcript__overview"
              id="comic-long-description"
              aria-labelledby="description-title"
            >
              <p className="eyebrow">Text overview</p>
              <h2 id="description-title">Comic description</h2>
              <p>{story.longDescription}</p>
            </section>

            <section className="transcript__exact" aria-labelledby="transcript-title">
              <h2 id="transcript-title">Exact panel transcript</h2>
              <p>
                Dialogue is reproduced as it appears in the artwork. Speaker
                names are omitted where the balloon tails are not unambiguous.
              </p>

              <ol className="transcript__panels">
                {story.panels.map((panel) => (
                  <li key={panel.number}>
                    <div className="transcript__panel-heading">
                      <span>{String(panel.number).padStart(2, '0')}</span>
                      <h3>{panel.heading}</h3>
                    </div>
                    <p className="transcript__visual">{panel.visualDescription}</p>
                    <ul>
                      {panel.transcript.map((entry, index) => (
                        <li key={`${panel.number}-${entry.kind}-${index}`}>
                          <span>{transcriptKindLabels[entry.kind]}:</span>{' '}
                          {entry.text}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </details>

        <nav className="story-navigation" aria-label="Story navigation">
          {previous ? (
            <Link href={getStoryHref(previous)}>
              <span>Previous story</span>
              <strong>
                {previous.sequence}. {previous.title}
              </strong>
            </Link>
          ) : (
            <span className="story-navigation__empty">This is where the story begins.</span>
          )}
          {next ? (
            <Link href={getStoryHref(next)}>
              <span>Next story</span>
              <strong>
                {next.sequence}. {next.title}
              </strong>
            </Link>
          ) : (
            <Link href="/stories/">
              <span>End of the current archive</span>
              <strong>Back to all stories</strong>
            </Link>
          )}
        </nav>
      </article>
      <JsonLd data={storyJsonLd} />
    </main>
  )
}
