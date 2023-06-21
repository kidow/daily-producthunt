import { notFound, redirect } from 'next/navigation'
import { Client } from '@notionhq/client'
import type { Metadata } from 'next'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY })

interface Props {
  params: {
    id: string
  }
}

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = (await notion.pages.retrieve({
    page_id: params.id
  })) as any
  const url = page.properties['URL'].url
  const name = page.properties['이름'].title[0].text.content
  const title = page.properties['타이틀'].rich_text[0].text.content
  const intro = page.properties['한 줄 소개'].rich_text[0].text.content
  const image = page.cover.external.url
  return {
    title: `${name} - ${title} | 일간 ProductHunt`,
    description: intro,
    openGraph: {
      title: `${name} - ${title} | 일간 ProductHunt`,
      description: ``,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} - ${title} | 일간 ProductHunt`,
      description: intro,
      images: [image]
    }
  }
}

export async function generateStaticParams() {
  let results = []
  for await (const arr of getProducts()) {
    results.push(...arr)
  }
  return results
}

export default async function Page({ params }: Props) {
  const page = (await notion.pages.retrieve({
    page_id: params.id
  })) as any
  if (!page) {
    redirect('/products')
  }
  const url = page.properties['URL'].url
  const name = page.properties['이름'].title[0].text.content
  const iconUrl = page.icon.external.url
  const coverUrl = page.cover.external.url
  const title = page.properties['타이틀'].rich_text[0].text.content
  const intro = page.properties['한 줄 소개'].rich_text[0].text.content
  const core = page.properties['핵심 기능'].rich_text[0].text.content
  const platform = page.properties['지원 플랫폼'].rich_text[0].text.content
  const pricing = page.properties['가격 정책'].rich_text[0].text.content
  const tags = page.properties.태그.multi_select
  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="mt-10"></div>
    </div>
  )
}
