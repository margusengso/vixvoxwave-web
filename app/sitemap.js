import { getApprovedStories, getStoryHref } from '../lib/stories'
import { absoluteUrl } from '../lib/site'

export const dynamic = 'force-static'

export default function sitemap() {
  const staticRoutes = ['/', '/stories/', '/privacy/', '/support/']

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
    })),
    ...getApprovedStories().map((story) => ({
      url: absoluteUrl(getStoryHref(story)),
      images: [absoluteUrl(story.image.fallbackPath)],
    })),
  ]
}
