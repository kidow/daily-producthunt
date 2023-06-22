import { MetadataRoute } from 'next'
import { Client } from '@notionhq/client'

async function* getProducts() {
  let isFirst = true
  let nextCursor: string | null = null

  const notion = new Client({
    auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY
  })

  while (isFirst || nextCursor) {
    const { results, next_cursor } = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
      sorts: [{ property: '생성 일시', direction: 'ascending' }],
      ...(!!nextCursor ? { start_cursor: nextCursor } : {})
    })
    nextCursor = next_cursor
    if (isFirst) isFirst = false

    yield results
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let results = []
  for await (const arr of getProducts()) {
    results.push(...arr)
  }
  return [
    {
      url: 'https://dp.kidow.me',
      lastModified: new Date()
    },
    ...results.map((item) => ({
      url: `https://dp.kidow.me/product/${item.id}`,
      lastModified: new Date()
    }))
  ]
}
