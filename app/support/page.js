import { StoreAvailability } from '../../components/StoreAvailability'
import { SUPPORT_EMAIL } from '../../lib/site'

export const metadata = {
  title: 'Support',
  description:
    'Contact VixVoxWave support and find help with microphone permission, local data, privacy, and store availability.',
  alternates: {
    canonical: '/support/',
  },
  openGraph: {
    title: 'VixVoxWave support',
    description:
      'Direct support for microphone permission, local data, privacy, and availability questions.',
    url: '/support/',
  },
}

export default function SupportPage() {
  return (
    <main id="main-content">
      <header className="page-hero page-hero--compact section-shell">
        <p className="eyebrow">Support</p>
        <h1>Tell us what the room did.</h1>
        <p>
          Email us directly. Please do not send recordings, transcripts, or
          private conversation details unless they are genuinely necessary to
          explain your request.
        </p>
        <a className="contact__email" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}
        </a>
      </header>

      <section className="support-grid section-shell" aria-label="Support topics">
        <article>
          <p className="story-number">Microphone</p>
          <h2>Permission or listening issue</h2>
          <p>
            Include your device model, operating-system version, app version,
            and the step where the issue appears. You can revoke or restore
            microphone access in your device settings.
          </p>
        </article>
        <article>
          <p className="story-number">Privacy</p>
          <h2>Data or deletion question</h2>
          <p>
            Captured audio and transcripts are not uploaded to VixVoxWave. For
            support-email data or another rights request, email us from the
            address connected to the request.
          </p>
        </article>
        <article>
          <p className="story-number">Stores</p>
          <h2>Availability</h2>
          <p>
            VixVoxWave is not yet publicly listed on the App Store or Google
            Play. Store links will appear here only when their real listings
            are ready.
          </p>
          <StoreAvailability compact />
        </article>
      </section>
    </main>
  )
}
