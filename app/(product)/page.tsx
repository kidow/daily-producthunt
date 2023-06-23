import { Client } from '@notionhq/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Products } from 'templates'
import { Product } from 'components'
import Link from 'next/link'

dayjs.extend(relativeTime)

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
  fetch: (url, init) =>
    fetch(url, { ...init, next: { revalidate: 0 }, cache: 'no-store' })
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
      <div className="mb-4">
        <Link
          href="https://kidow.notion.site/93dbf7ddc40640ab98675faf728e28b5?v=4e63ecae497844098f406f2a9ab5cb7e&pvs=4"
          target="_blank"
          className="font-semibold hover:underline"
        >
          기존 전송 내역 보기 →
        </Link>
      </div>
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
