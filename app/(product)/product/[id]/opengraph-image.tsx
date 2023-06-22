import { Client } from '@notionhq/client'
import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export const alt = '일간 ProductHunt'
export const contentType = 'image/png'

export default async function Image({
  params: { id }
}: {
  params: { id: string }
}) {
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY })
  const page = (await notion.pages.retrieve({ page_id: id })) as any

  const name = page.properties['이름'].title[0].text.content
  const icon = page.icon.external.url
  const cover = page.cover.external.url
  const title = page.properties['타이틀'].rich_text[0].text.content
  return new ImageResponse(
    (
      <div tw="h-full w-full flex items-start justify-start bg-white relative">
        <div tw="flex items-start justify-start h-full">
          <img
            style={{ objectFit: 'cover' }}
            tw="absolute inset-0 w-full h-full"
            src={cover}
          />
          <div tw="bg-black absolute inset-0 bg-opacity-70"></div>
          <div tw="flex items-center w-full h-full px-20">
            <div tw="flex-1 flex flex-col mr-20 text-white">
              <h1 tw="text-[96px] font-black">{name}</h1>
              <div tw="text-[48px] font-medium">{title}</div>
            </div>
            <div tw="flex relative">
              <img
                style={{ objectFit: 'cover' }}
                tw="mx-auto w-[280px] h-[280px] rounded-full"
                src={icon}
              />
            </div>
          </div>
        </div>
      </div>
    )
  )
}
