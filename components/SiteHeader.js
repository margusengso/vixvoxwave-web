import Link from 'next/link'

import { BrandMark } from './BrandMark'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="VixVoxWave home">
          <BrandMark />
          <span>VIXVOXWAVE</span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/stories/">Stories</Link>
          <Link href="/privacy/">Privacy</Link>
          <Link href="/support/">Support</Link>
        </nav>
      </div>
    </header>
  )
}
