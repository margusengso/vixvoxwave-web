import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main id="main-content" className="not-found section-shell">
      <p className="eyebrow">404 · Quiet room</p>
      <h1>Nothing answered here.</h1>
      <p>
        This page does not exist, moved before it became permanent, or was
        never part of the story.
      </p>
      <div className="not-found__links">
        <Link className="button-link" href="/">
          Back home
        </Link>
        <Link className="text-link" href="/stories/">
          Read the stories
        </Link>
      </div>
    </main>
  )
}
