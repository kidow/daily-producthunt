import { MetadataRoute } from 'next'
import { supabase } from 'services'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await supabase.from('histories').select('id')
  return [
    {
      url: 'https://daily-producthunt.dongwook.kim',
      lastModified: new Date()
    },
    ...(data
      ? data.map((item) => ({
          url: `https://daily-producthunt.dongwook.kim/product/${item.id}`,
          lastModified: new Date()
        }))
      : [])
  ]
}
