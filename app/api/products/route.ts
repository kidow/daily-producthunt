import { Client } from '@notionhq/client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const cursor = url.searchParams.get('cursor')
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY })

  const { results, next_cursor, has_more } = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
    sorts: [{ property: '생성 일시', direction: 'descending' }],
    page_size: 20,
    start_cursor: cursor || undefined
  })

  return NextResponse.json({ results, next_cursor, has_more })
}
