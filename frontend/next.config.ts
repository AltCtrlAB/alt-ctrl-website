import type { NextConfig } from 'next'

const noIndex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }]

const nextConfig: NextConfig = {
  // Covers crawlers that ignore robots.txt, and the callback's redirects, which carry no meta tags.
  async headers() {
    return [
      { source: '/fortnox/:path*', headers: noIndex },
      { source: '/api/:path*', headers: noIndex },
    ]
  },
}

export default nextConfig
