import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Customer-only Fortnox and Spiris activation flows, plus the API routes.
      disallow: ['/fortnox', '/spiris', '/api/'],
    },
    sitemap: 'https://www.alltunderkontroll.se/sitemap.xml',
  }
}
