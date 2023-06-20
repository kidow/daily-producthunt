import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dp.kidow.me',
      lastModified: new Date()
    }
  ]
}
