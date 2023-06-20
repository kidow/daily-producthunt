import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/l'
    },
    sitemap: 'https://dp.kidow.me/sitemap.xml'
  }
}