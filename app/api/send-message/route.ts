import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { WebClient } from '@slack/web-api'
import { Client } from '@notionhq/client'
import { request } from 'services'

export async function POST(req: Request) {
  const { id } = await req.json()
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const [{ data }, { data: users }] = await Promise.all([
    supabase.from('reserves').select('*').eq('id', id).single(),
    supabase.from('connections').select('*')
  ])

  if (!data) {
    return NextResponse.json({ success: false, message: '데이터가 없습니다.' })
  }

  try {
    if (users) {
      const result = await Promise.all([
        ...users
          .filter((item) => !!item.slack_token && !!item.slack_channel_id)
          .map((item) => {
            const web = new WebClient(item.slack_token!)
            return web.chat.postMessage({
              channel: item.slack_channel_id!,
              text: `${data.name} - ${data.title}`,
              blocks: [
                {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `*<https://dp.kidow.me/l?url=${data.url}|${data.name} - ${data.title}>*`
                  }
                },
                {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `• ${data.intro}\n• ${data.core}\n• ${data.platform}\n• ${data.pricing}`
                  },
                  accessory: {
                    type: 'image',
                    image_url: data.icon_url,
                    alt_text: data.name
                  }
                },
                {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: data.tags.map((text) => '`' + text + '`').join(' ')
                  }
                },
                {
                  type: 'image',
                  image_url: data.cover_url,
                  alt_text: 'Cover image'
                }
              ]
            })
          }),
        ...users
          .filter((item) => !!item.notion_token && !!item.notion_database_id)
          .map((item) => {
            const notion = new Client({ auth: item.notion_token! })
            return notion.pages.create({
              parent: {
                type: 'database_id',
                database_id: item.notion_database_id!
              },
              icon: {
                type: 'external',
                external: {
                  url: data.icon_url
                }
              },
              properties: {
                이름: {
                  title: [
                    {
                      text: { content: data.name },
                      annotations: { bold: true }
                    }
                  ]
                },
                타이틀: {
                  rich_text: [
                    {
                      text: { content: data.title },
                      annotations: { bold: true }
                    }
                  ]
                },
                태그: {
                  multi_select: data.tags.map((text) => ({ name: text }))
                },
                URL: {
                  url: data.url
                },
                '한 줄 소개': {
                  rich_text: [{ text: { content: data.intro } }]
                },
                '핵심 기능': {
                  rich_text: [{ text: { content: data.core } }]
                },
                '지원 플랫폼': {
                  rich_text: [{ text: { content: data.platform } }]
                },
                '가격 정책': {
                  rich_text: [{ text: { content: data.pricing } }]
                }
              },
              children: [
                {
                  object: 'block',
                  type: 'image',
                  image: {
                    type: 'external',
                    external: {
                      url: data.cover_url
                    }
                  }
                }
              ]
            })
          }),
        ...users
          .filter((item) => !!item.discord_webhook_url)
          .map((item) => {
            return request(item.discord_webhook_url!, {
              method: 'POST',
              headers: new Headers({ 'Content-Type': 'application/json' }),
              body: JSON.stringify({
                username: '일간 ProductHunt',
                avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publics/daily-producthunt.png`,
                embeds: [
                  {
                    description: `- ${data.intro}\n- ${data.core}\n- ${
                      data.platform
                    }\n- ${data.pricing}\n${data.tags.join(', ')}`,
                    image: {
                      url: data.cover_url
                    },
                    thumbnail: {
                      url: data.icon_url
                    },
                    title: `${data.name} - ${data.title}`,
                    url: `https://dp.kidow.me/l?url=${data.url}`
                  }
                ]
              })
            })
          })
      ])
      return NextResponse.json({ success: true, data: result })
    }

    return NextResponse.json({ success: false, data: [] })
  } catch (err) {
    return NextResponse.json({
      success: false,
      data: err,
      message: '실패했습니다.'
    })
  }
}
