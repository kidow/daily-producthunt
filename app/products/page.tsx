import { Client } from '@notionhq/client'
import Link from 'next/link'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
  fetch: (url, init) =>
    fetch(url, { ...init, next: { revalidate: 60 * 60 * 24 } })
})

export const metadata = {
  title: '일간 ProductHunt 제품 모음'
}

export default async function Page() {
  const data = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
    sorts: [{ property: '생성 일시', direction: 'descending' }],
    page_size: 20
  })
  const results = data.results as any[]
  return (
    <div className="mx-auto max-w-4xl px-4">
      <header className="flex h-12 items-center justify-between">
        <span>일간 ProductHunt</span>
        <span>소개</span>
      </header>
      <main>
        <ul className="space-y-6">
          {results.map((item, key) => (
            <li key={key}>
              <Link className="flex gap-4" href={`/products/${item.id}`}>
                <img
                  src={item.icon.external.url}
                  alt="logo"
                  className="h-20 w-20 rounded"
                />
                <div>
                  <div>
                    <span className="font-medium">
                      {item.properties['이름'].title[0].text.content}
                    </span>
                    <span className="text-sm">
                      {dayjs(item.created_time).locale('ko').format('L LT')}
                    </span>
                  </div>
                  <div>
                    {item.properties['타이틀'].rich_text[0].text.content}
                  </div>
                  <ul>
                    {item.properties.태그.multi_select.map((tag: any) => (
                      <li key={tag.id}>{tag.name}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer>asd</footer>
    </div>
  )
}
