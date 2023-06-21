import { Client } from '@notionhq/client'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
  fetch: (url, init) =>
    fetch(url, { ...init, next: { revalidate: 60 * 60 * 24 } })
})

export default async function Page() {
  const data = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
    sorts: [{ property: '생성 일시', direction: 'descending' }],
    page_size: 20
  })
  const results = data.results as any[]
  return (
    <div className="mx-auto max-w-4xl px-4">
      <ul className="space-y-6">
        {results.map((item, key) => (
          <li key={key}>
            <Link className="flex gap-4" href={`/products/${item.id}`}>
              <img
                src={item.icon.external.url}
                alt="logo"
                className="h-12 w-12 rounded md:h-20 md:w-20"
              />
              <div className="space-y-0.5 md:space-y-1">
                <h3 className="text-lg font-semibold">
                  {item.properties['이름'].title[0].text.content}
                </h3>
                <p className="break-keep text-neutral-400">
                  {item.properties['타이틀'].rich_text[0].text.content}
                </p>
                <ul className="flex items-center gap-2 pt-1">
                  {item.properties.태그.multi_select.map((tag: any) => (
                    <li
                      key={tag.id}
                      className="rounded-full border border-neutral-700 px-1.5 py-0.5 text-xs text-neutral-400"
                    >
                      {tag.name}
                    </li>
                  ))}
                  <li className="text-xs text-neutral-500">
                    {dayjs(item.created_time).locale('ko').fromNow()}
                  </li>
                </ul>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
