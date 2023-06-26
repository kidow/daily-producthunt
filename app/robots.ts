import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/l'
    },
    sitemap: 'https://daily-producthunt.kidow.me/sitemap.xml'
  }
}
