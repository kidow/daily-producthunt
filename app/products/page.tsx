import { request } from 'services'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY })

export const metadata = {
  title: '일간 ProductHunt 제품 모음'
}

export default async function Page() {
  const { results } = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
    sorts: [{ property: '생성 일시', direction: 'ascending' }]
  })
  return <div>{JSON.stringify(results)}</div>
}
