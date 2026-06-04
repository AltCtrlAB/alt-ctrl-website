import type { Metadata } from 'next'
import { DM_Serif_Display, JetBrains_Mono, DM_Sans } from 'next/font/google'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.alltunderkontroll.se'),
  title: {
    default: 'alt_ctrl_ - Allt Under Kontroll AB',
    template: '%s | alt_ctrl_',
  },
  description:
    'Er partner inom AI, automation och smarta processer. Vi hjälper er att eliminera manuella steg, sänka kostnader och fatta snabbare beslut så att ni alltid har Allt Under Kontroll.',
  keywords: [
    'processautomation',
    'AI',
    'automation',
    'digitalisering',
    'svenska bolag',
    'effektivisering',
    'Göteborg',
    'Allt Under Kontroll',
  ],
  authors: [{ name: 'Allt Under Kontroll AB' }],
  creator: 'Allt Under Kontroll AB',
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://www.alltunderkontroll.se',
    siteName: 'alt_ctrl_ - Allt Under Kontroll AB',
    title: 'alt_ctrl_ - Allt Under Kontroll AB',
    description:
      'Er partner inom AI, automation och smarta processer. Vi hjälper er att eliminera manuella steg, sänka kostnader och fatta snabbare beslut så att ni alltid har Allt Under Kontroll.',
    images: [{ url: '/assets/og-image.png', width: 1200, height: 630, alt: 'alt_ctrl_ - Allt Under Kontroll AB' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'alt_ctrl_ - Allt Under Kontroll AB',
    description:
      'Er partner inom AI, automation och smarta processer. Vi hjälper er att eliminera manuella steg, sänka kostnader och fatta snabbare beslut så att ni alltid har Allt Under Kontroll.',
    images: ['/assets/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.alltunderkontroll.se',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className={`${dmSerifDisplay.variable} ${jetbrainsMono.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Allt Under Kontroll AB',
              alternateName: 'alt_ctrl_',
              url: 'https://www.alltunderkontroll.se',
              logo: 'https://www.alltunderkontroll.se/assets/og-image.png',
              description:
                'Vi bygger skräddarsydda AI- och SaaS-lösningar till fast pris, anpassade efter kundens befintliga system och miljö.',
              email: 'contact@alltunderkontroll.se',
              telephone: '+46768680671',
              sameAs: ['https://www.linkedin.com/company/allt-under-kontroll/'],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Östra Hamngatan 16',
                postalCode: '411 09',
                addressLocality: 'Göteborg',
                addressCountry: 'SE',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
