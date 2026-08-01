import Link from 'next/link'

import { StoreAvailability } from '../components/StoreAvailability'
import { StoryCard } from '../components/StoryCard'
import { getApprovedStories } from '../lib/stories'
import { SUPPORT_EMAIL } from '../lib/site'

const HERO_WAVEFORM = [
  { height: 14, opacity: 0.56, shift: 1, tilt: 0 },
  { height: 20, opacity: 0.58, shift: -1, tilt: 1 },
  { height: 16, opacity: 0.6, shift: 2, tilt: -1 },
  { height: 25, opacity: 0.62, shift: -1, tilt: 1 },
  { height: 20, opacity: 0.64, shift: 2, tilt: -1 },
  { height: 29, opacity: 0.66, shift: -2, tilt: 1 },
  { height: 23, opacity: 0.68, shift: 1, tilt: -1 },
  { height: 35, opacity: 0.7, shift: -2, tilt: 1 },
  { height: 27, opacity: 0.72, shift: 2, tilt: -1 },
  { height: 41, opacity: 0.74, shift: -3, tilt: 2 },
  { height: 32, opacity: 0.76, shift: 3, tilt: -2 },
  { height: 53, opacity: 0.8, shift: -3, tilt: 2 },
  { height: 39, opacity: 0.82, shift: 4, tilt: -2 },
  { height: 69, opacity: 0.86, shift: -5, tilt: 3 },
  { height: 47, opacity: 0.88, shift: 6, tilt: -3 },
  { height: 85, opacity: 0.92, shift: -7, tilt: 4 },
  { height: 57, opacity: 0.94, shift: 8, tilt: -5 },
  { height: 99, opacity: 1, shift: -8, tilt: 5 },
  { height: 44, opacity: 0.94, shift: 9, tilt: -6 },
  { height: 83, opacity: 0.98, shift: -7, tilt: 4 },
]

export default function HomePage() {
  const [firstStory] = getApprovedStories()

  return (
    <main id="main-content">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">A local-first audio experience</p>
          <h1 id="hero-title">
            Let the room
            <span> speak.</span>
          </h1>
          <p className="hero__lede">
            VixVoxWave listens only while you run a visible foreground session.
            It finds a memorable phrase or room event on your device, waits for
            the moment, then plays it back in your chosen style.
          </p>

          <StoreAvailability />

          <p className="hero__availability">
            Android and iOS releases are in preparation. No store listing is
            live yet.
          </p>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="signal-card">
            <div className="signal-card__top">
              <img
                alt=""
                className="signal-card__app-icon"
                height="320"
                src="/media/brand/vixvoxwave-app-icon-320.webp"
                width="320"
              />
              <span>VIXVOXWAVE</span>
            </div>
            <p>THE ROOM IS LISTENING BACK</p>
            <div className="hero-wave">
              <div className="hero-wave__bars">
                {HERO_WAVEFORM.map(({ height, opacity, shift, tilt }, index) => (
                  <span
                    className="hero-wave__bar"
                    key={`${height}-${index}`}
                    style={{
                      '--wave-height': `${height}px`,
                      '--wave-opacity': opacity,
                      '--wave-shift': `${shift}px`,
                      '--wave-tilt': `${tilt}deg`,
                    }}
                  />
                ))}
              </div>
              <div className="hero-wave__wisp">
                <span className="hero-wave__curl" />
              </div>
            </div>
            <div className="signal-card__status">
              <span className="status-dot" />
              Foreground session
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip" aria-label="Privacy highlights">
        <span>Foreground only</span>
        <span>On-device speech processing</span>
        <span>No captured-content history</span>
      </div>

      <section
        className="section section-shell"
        id="how-it-works"
        aria-labelledby="how-title"
      >
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2 id="how-title">A tiny bit of timing. A lot of reaction.</h2>
          <p>
            You choose what the room can answer with and how that answer should
            sound. The current experience stays intentionally simple.
          </p>
        </div>

        <ol className="steps">
          <li>
            <span>01</span>
            <h3>Start on purpose</h3>
            <p>
              Microphone access is requested only after you tap Start
              Listening. The session stays visible and stops when you leave it.
            </p>
          </li>
          <li>
            <span>02</span>
            <h3>Listen locally</h3>
            <p>
              Default mode can analyze speech and room context on device.
              Ambient Only skips speech transcription and listens for room
              events.
            </p>
          </li>
          <li>
            <span>03</span>
            <h3>Let the moment land</h3>
            <p>
              A selected moment returns in Clean, Grave Creepy, or Hysteric
              Funny style. Stop at any time; captured content is not kept as
              history.
            </p>
          </li>
        </ol>
      </section>

      <section className="modes section-shell" aria-labelledby="modes-title">
        <div className="modes__intro">
          <p className="eyebrow">Two ways to listen</p>
          <h2 id="modes-title">Speech, atmosphere, or both.</h2>
        </div>
        <div className="mode-card mode-card--purple">
          <p className="mode-card__number">01</p>
          <h3>Default</h3>
          <p>
            Finds meaningful speech or room context, then replays the strongest
            eligible moment.
          </p>
        </div>
        <div className="mode-card mode-card--yellow">
          <p className="mode-card__number">02</p>
          <h3>Ambient Only</h3>
          <p>
            Listens for room events without speech transcription and lets the
            atmosphere provide the surprise.
          </p>
        </div>
      </section>

      <section className="section section-shell story-feature" id="story" aria-labelledby="story-title">
        <div className="section-heading section-heading--row">
          <div>
            <p className="eyebrow">The stories</p>
            <h2 id="story-title">Every room has a setup.</h2>
          </div>
          <Link className="text-link" href="/stories/">
            Browse all stories <span aria-hidden="true">→</span>
          </Link>
        </div>

        {firstStory ? <StoryCard featured story={firstStory} /> : null}
      </section>

      <section className="privacy-teaser section-shell" id="privacy" aria-labelledby="privacy-title">
        <div>
          <p className="eyebrow">Private by default</p>
          <h2 id="privacy-title">Your microphone content stays on your device.</h2>
        </div>
        <div className="privacy-teaser__copy">
          <p>
            VixVoxWave does not upload microphone audio, transcripts, or
            acoustic features. Audio is held temporarily for the active
            foreground experience and cleaned up at session boundaries.
          </p>
          <p>
            This static website launches without analytics, ads, accounts,
            nonessential cookies, or a contact form. Its host still processes
            routine request logs to deliver and secure the site.
          </p>
          <Link className="button-link button-link--light" href="/privacy/">
            Read the full privacy policy
          </Link>
        </div>
      </section>

      <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">Questions, strange rooms, good ideas?</h2>
        <p>
          Reach VixVoxWave support directly. There is no web form and no hidden
          mailing list.
        </p>
        <a className="contact__email" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}
        </a>
      </section>
    </main>
  )
}
