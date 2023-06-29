import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Client } from '@notionhq/client'
import TelegramBot from 'node-telegram-bot-api'
import * as Sentry from '@sentry/nextjs'

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
      const { data: page } = await supabase
        .from('histories')
        .insert({
          url: data.url,
          icon_url: data.icon_url,
          cover_url: data.cover_url,
          name: data.name,
          title: data.title,
          intro: data.intro,
          core: data.core,
          platform: data.platform,
          pricing: data.pricing,
          tags: data.tags
        })
        .select('id')
        .single()

      const result = await Promise.allSettled([
        ...users.map((item) => {
          if (item.slack_webhook_url) {
            return fetch(item.slack_webhook_url, {
              method: 'POST',
              headers: new Headers({ 'Content-Type': 'application/json' }),
              body: JSON.stringify({
                text: `${data.name} - ${data.title}`,
                blocks: [
                  {
                    type: 'section',
                    text: {
                      type: 'mrkdwn',
                      text: `*<https://daily-producthunt.kidow.me/l?id=${page?.id}|${data.name} - ${data.title}>*`
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
            })
          }
          if (!!item.notion_database_id && !!item.notion_token) {
            const notion = new Client({ auth: item.notion_token })
            return notion.pages.create({
              parent: {
                type: 'database_id',
                database_id: item.notion_database_id!
              },
              icon: {
                type: 'external',
                external: { url: data.icon_url }
              },
              cover: {
                type: 'external',
                external: { url: data.cover_url }
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
                  image: { type: 'external', external: { url: data.cover_url } }
                }
              ]
            })
          }
          if (!!item.discord_webhook_url) {
            return fetch(item.discord_webhook_url!, {
              method: 'POST',
              headers: new Headers({ 'Content-Type': 'application/json' }),
              body: JSON.stringify({
                username: '일간 ProductHunt',
                avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publics/daily-producthunt.png`,
                embeds: [
                  {
                    description: `- ${data.intro}\n- ${data.core}\n- ${data.platform}\n- ${data.pricing}`,
                    image: {
                      url: data.cover_url
                    },
                    thumbnail: {
                      url: data.icon_url
                    },
                    title: `${data.name} - ${data.title}`,
                    url: `https://daily-produchunt.kidow.me/l?id=${page?.id}`
                  }
                ]
              })
            })
          }
          if (!!item.telegram_chatting_id) {
            const bot = new TelegramBot(
              process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
            )
            return bot.sendMessage(
              item.telegram_chatting_id!,
              `**[${data.name} - ${data.title}](https://daily-producthunt.kidow.me/l?id=${data.id})**\n- ${data.intro}\n- ${data.core}\n- ${data.platform}\n- ${data.pricing}`,
              { parse_mode: 'Markdown' }
            )
          }
          return undefined
        }),
        fetch('https://www.tistory.com/apis/post/write', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            access_token: process.env.NEXT_PUBLIC_TISTORY_ACCESS_TOKEN,
            output: 'json',
            blogName: 'wcgo2ling',
            title: `${data.name} - ${data.title}`,
            category: 1113722,
            visibility: 3,
            tag: data.tags.join(','),
            content: `<p><figure class='imageblock alignCenter' data-origin-width='1304' data-origin-height='750' data-ke-mobilestyle='alignCenter'><span data-url='${
              data.cover_url
            }' data-lightbox='lightbox' data-alt=''><img src='${
              data.cover_url
            }' srcset='${data.cover_url}' data-filename='${
              data.name
            }.png' data-ke-mobilestyle='alignCenter'/></span></figure></p>\n<ul style=\"list-style-type: disc;\" data-ke-list-type=\"disc\">\n<li>${
              data.intro
            }</li>\n<li>${data.core}</li>\n<li>${data.platform}</li>\n<li>${
              data.pricing
            }</li>\n</ul>\n<figure id=\"og_1687252633313\" contenteditable=\"false\" data-ke-type=\"opengraph\" data-ke-align=\"alignCenter\" data-og-type=\"website\" data-og-title=\"${
              data.name
            } - ${data.title}\" data-og-description=\"${
              data.intro
            }\" data-og-host=\"${
              new URL(data.url).origin
            }\" data-og-source-url=\"${data.url}\" data-og-url=\"${
              data.url
            }\" data-og-image=\"${data.icon_url}\"><a href=\"${
              data.url
            }\" target=\"_blank\" rel=\"noopener\" data-source-url=\"${
              data.url
            }\">\n<div class=\"og-image\" style=\"background-image: url('${
              data.icon_url
            }');\">&nbsp;</div>\n<div class=\"og-text\">\n<p class=\"og-title\" data-ke-size=\"size16\">${
              data.name
            } - ${
              data.title
            }</p>\n<p class=\"og-desc\" data-ke-size=\"size16\">${
              data.intro
            }</p>\n<p class=\"og-host\" data-ke-size=\"size16\">${
              new URL(data.url).host
            }</p>\n</div>\n</a></figure>\n<figure id=\"og_1687252745800\" contenteditable=\"false\" data-ke-type=\"opengraph\" data-ke-align=\"alignCenter\" data-og-type=\"website\" data-og-title=\"일간 ProductHunt\" data-og-description=\"일간 ProductHunt는 ProductHunt에 올라오는 상위 5개 제품을 요약해서 슬랙, 디스코드를 통해 메시지를 전달하고 노션을 통해 전송 내역을 저장해줍니다. ProductHunt는 전 세계 450만 명 이상의 IT 메이커\" data-og-host=\"slashpage.com\" data-og-source-url=\"https://slashpage.com/daily-producthunt\" data-og-url=\"https://slashpage.com/daily-producthunt\" data-og-image=\"https://scrap.kakaocdn.net/dn/6g056/hyS2xRSxbO/gxT6rt6y5pWTeT3V7bFkj0/img.jpg?width=512&amp;height=512&amp;face=0_0_512_512,https://scrap.kakaocdn.net/dn/W8hKM/hyS4pLqVGi/YQVketpQssqDqN4beZrmYk/img.jpg?width=512&amp;height=512&amp;face=0_0_512_512\"><a href=\"https://slashpage.com/daily-producthunt\" target=\"_blank\" rel=\"noopener\" data-source-url=\"https://slashpage.com/daily-producthunt\">\n<div class=\"og-image\" style=\"background-image: url('https://scrap.kakaocdn.net/dn/6g056/hyS2xRSxbO/gxT6rt6y5pWTeT3V7bFkj0/img.jpg?width=512&amp;height=512&amp;face=0_0_512_512,https://scrap.kakaocdn.net/dn/W8hKM/hyS4pLqVGi/YQVketpQssqDqN4beZrmYk/img.jpg?width=512&amp;height=512&amp;face=0_0_512_512');\">&nbsp;</div>\n<div class=\"og-text\">\n<p class=\"og-title\" data-ke-size=\"size16\">일간 ProductHunt</p>\n<p class=\"og-desc\" data-ke-size=\"size16\">일간 ProductHunt는 ProductHunt에 올라오는 상위 5개 제품을 요약해서 슬랙, 디스코드를 통해 메시지를 전달하고 노션을 통해 전송 내역을 저장해줍니다. ProductHunt는 전 세계 450만 명 이상의 IT 메이커</p>\n<p class=\"og-host\" data-ke-size=\"size16\">slashpage.com</p>\n</div>\n</a></figure>`
          })
        })
      ])
      console.log('result', result)
      return NextResponse.json({ success: true, data: result })
    }

    return NextResponse.json({ success: false, data: [] })
  } catch (err) {
    console.log(err)
    Sentry.captureException(err)
    return NextResponse.json({
      success: false,
      data: err,
      message: '실패했습니다.'
    })
  }
}
