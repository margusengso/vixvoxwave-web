import { PrivacyPolicy } from '../../components/PrivacyPolicy'

export const metadata = {
  title: 'Privacy policy',
  description:
    'How VixVoxWave handles foreground microphone audio, local app settings, website request logs, and support email.',
  alternates: {
    canonical: '/privacy/',
  },
  openGraph: {
    title: 'VixVoxWave privacy policy',
    description:
      'Clear details about on-device audio processing, temporary retention, website logs, and support contact.',
    url: '/privacy/',
  },
}

export default function PrivacyPage() {
  return (
    <main id="main-content" className="legal-page section-shell">
      <PrivacyPolicy />
    </main>
  )
}
