import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/l', '/dashboard', '/login', '/connect']
    },
    sitemap: 'https://daily-producthunt.kidow.me/sitemap.xml'
  }
}
