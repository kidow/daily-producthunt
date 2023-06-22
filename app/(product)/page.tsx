import { Client } from '@notionhq/client'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Products } from 'templates'
import { Product } from 'components'

dayjs.extend(relativeTime)

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
  fetch: (url, init) =>
    fetch(url, { ...init, next: { revalidate: 60 * 60 * 24 } })
})

export default async function Page() {
  const { results, next_cursor, has_more } = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
    sorts: [{ property: '생성 일시', direction: 'descending' }],
    page_size: 20
  })
  const list = results as any[]
  return (
    <div className="mx-auto max-w-4xl px-4">
      <ul className="space-y-6">
        {list.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            iconUrl={item.icon.external.url}
            name={item.properties['이름'].title[0].text.content}
            title={item.properties['타이틀'].rich_text[0].text.content}
            tags={item.properties.태그.multi_select}
            createdAt={item.created_time}
          />
        ))}
        <Products
          length={list.length}
          nextCursor={next_cursor}
          hasMore={has_more}
        />
      </ul>
    </div>
  )
}
