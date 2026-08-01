import { PrivacyPolicy } from '../../components/PrivacyPolicy'

export const metadata = {
  title: 'Privacy policy',
  description:
    'How VixVoxWave handles on-device microphone processing, local app settings, website visits, and support email.',
  alternates: {
    canonical: '/privacy/',
  },
  openGraph: {
    title: 'VixVoxWave privacy policy',
    description:
      'Clear details about on-device audio processing, temporary retention, limited website data, and your privacy choices.',
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
