import { NextResponse } from 'next/server'
import { WebClient } from '@slack/web-api'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(req: Request) {
  const web = new WebClient(process.env.NEXT_PUBLIC_SLACK_TOKEN)
  const url = new URL(req.url)
  const { access_token, authed_user } = await web.oauth.v2.access({
    client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET,
    code: url.searchParams.get('code') as string,
    redirect_uri: 'https://daily-producthunt.kidow.me/api/redirect/slack'
  })

  const bot = new WebClient(access_token)
  const { user } = await bot.users.identity({
    token: authed_user?.access_token
  })
  const { channels } = await bot.conversations.list({ types: 'im' })
  const channelId = channels?.find((item) => item.user === authed_user?.id)?.id
  if (!channelId) {
    console.log('user', authed_user)
    console.log('channels', channels)
    NextResponse.json({
      success: false,
      message:
        '슬랙 연결에 실패했습니다. 문제가 계속 반복된다면 커뮤니티에 문의해주시기 바랍니다.'
    })
  }

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { data } = await supabase
    .from('connections')
    .select('email')
    .eq('email', user?.email)
    .single()
  if (data) {
    await supabase
      .from('connections')
      .update({ slack_token: access_token, slack_channel_id: channelId })
      .eq('email', user?.email)
  } else {
    await supabase.from('connections').insert({
      email: user?.email || null,
      slack_token: access_token,
      slack_channel_id: channelId
    })
  }

  return NextResponse.json({
    success: true,
    message: '통합이 완료되었습니다. 이 창을 닫아주세요.'
  })
}
