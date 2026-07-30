import './globals.css'

import { JsonLd } from '../components/JsonLd'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
  absoluteUrl,
} from '../lib/site'

export const metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${SITE_NAME} — Let the room speak`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [
      {
        url: '/favicon.png',
        sizes: '256x256',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.png',
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Let the room speak`,
    description: SITE_DESCRIPTION,
    url: '/',
    images: [
      {
        url: '/media/social/vixvoxwave-social-card.jpg',
        width: 1200,
        height: 626,
        alt: 'VixVoxWave — Let the room speak, with a purple audio wave becoming a ghostly wisp.',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Let the room speak`,
    description: SITE_DESCRIPTION,
    images: ['/media/social/vixvoxwave-social-card.jpg'],
  },
}

export const viewport = {
  colorScheme: 'dark',
  themeColor: '#120f1d',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  url: SITE_ORIGIN,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_ORIGIN,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <JsonLd data={websiteJsonLd} />
      </body>
    </html>
  )
}
