import { NextResponse } from 'next/server'
import { WebClient } from '@slack/web-api'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import * as Sentry from '@sentry/nextjs'

export async function GET(req: Request) {
  const web = new WebClient(process.env.NEXT_PUBLIC_SLACK_TOKEN)
  const url = new URL(req.url)
  try {
    const result = await web.oauth.v2.access({
      client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET,
      code: url.searchParams.get('code') as string,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/redirect/slack`
    })
    const bot = new WebClient(result.access_token)
    const { user } = await bot.users.identity({
      token: result.authed_user?.access_token
    })
    const { channels } = await bot.conversations.list({
      types: 'im',
      limit: 100
    })
    if (!channels) {
      return NextResponse.json({
        success: false,
        message:
          '해당 채널이 존재하지 않습니다. 문제가 지속된다면 커뮤니티에 문의바랍니다.'
      })
    }

    const messages = await Promise.all(
      channels.map((item) =>
        bot.chat.postMessage({
          channel: item.id!,
          text: '통합이 완료되었습니다.'
        })
      )
    )
    for (const message of messages) {
      if (message.ok) {
        const conversation = await bot.conversations.info({
          channel: message.channel!
        })
        if (
          // @ts-ignore
          conversation.channel?.latest?.bot_profile?.name === '일간 ProductHunt'
        ) {
          const supabase = createRouteHandlerClient<Database>({ cookies })
          const { data } = await supabase
            .from('connections')
            .select('*')
            .match({
              email: user?.email,
              slack_token: result.access_token,
              slack_channel_id: message.channel!
            })
            .single()
          if (!data) {
            await supabase.from('connections').insert({
              email: user?.email || null,
              slack_token: result.access_token,
              slack_channel_id: message.channel!
            })
          }
          return NextResponse.json({
            success: message.ok,
            message: '통합이 완료되었습니다. 이 창을 닫아주세요.'
          })
        }
      }
    }

    return NextResponse.json({
      success: false,
      message:
        '슬랙 연결에 실패했습니다. 문제가 계속 반복된다면 커뮤니티에 문의해주시기 바랍니다.'
    })
  } catch (err) {
    console.log(err)
    Sentry.captureException(err)
    return NextResponse.json({ success: false })
  }
}
