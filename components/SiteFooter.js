import Link from 'next/link'

import { SUPPORT_EMAIL } from '../lib/site'
import { BrandMark } from './BrandMark'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <div className="wordmark wordmark--footer" aria-label="VixVoxWave">
            <BrandMark />
            <span>VIXVOXWAVE</span>
          </div>
          <p>Let the room speak. Keep the moment local.</p>
        </div>

        <div className="site-footer__links">
          <Link href="/stories/">Stories</Link>
          <Link href="/privacy/">Privacy</Link>
          <Link href="/support/">Support</Link>
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </div>
      </div>
      <p className="site-footer__fineprint">
        © {new Date().getUTCFullYear()} VixVoxWave. Store availability and comic
        scenes are stated on their respective pages.
      </p>
    </footer>
  )
}
