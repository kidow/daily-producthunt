import { NextResponse } from 'next/server'
import { WebClient } from '@slack/web-api'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(req: Request) {
  const web = new WebClient(process.env.NEXT_PUBLIC_SLACK_TOKEN)
  const url = new URL(req.url)
  const result = await web.oauth.v2.access({
    client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET,
    code: url.searchParams.get('code') as string,
    redirect_uri: 'https://daily-producthunt.kidow.me/api/redirect/slack'
  })

  const bot = new WebClient(result.authed_user?.access_token)
  const { user } = await bot.users.identity({
    token: result.authed_user?.access_token
  })
  const { channels } = await bot.conversations.list({ types: 'im' })
  const channelId = channels?.find(
    (item) => item.user === result.authed_user?.id
  )?.id
  if (!channelId) {
    console.log('channelId not found.')
    NextResponse.json({
      success: false,
      message:
        '슬랙 연결에 실패했습니다. 문제가 계속 반복된다면 커뮤니티에 문의해주시기 바랍니다.'
    })
  }

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { data } = await supabase
    .from('connections')
    .select('*')
    .match({
      email: user?.email,
      slack_token: result.access_token,
      slack_channel_id: channelId
    })
    .single()
  if (!data) {
    await supabase.from('connections').insert({
      email: user?.email || null,
      slack_token: result.access_token,
      slack_channel_id: channelId
    })
  }
  const { ok } = await bot.chat.postMessage({
    channel: channelId!,
    text: data ? '이미 통합되어있습니다.' : '통합이 완료되었습니다.'
  })

  return NextResponse.json({
    success: ok,
    message: ok
      ? '통합이 완료되었습니다. 이 창을 닫아주세요.'
      : '슬랙 연결에 실패했습니다. 문제가 계속 반복된다면 커뮤니티에 문의해주시기 바랍니다.',
    result,
    channels
  })
}
