import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Customer-only Fortnox activation flow, plus the API routes.
      disallow: ['/fortnox', '/api/'],
    },
    sitemap: 'https://www.alltunderkontroll.se/sitemap.xml',
  }
}
