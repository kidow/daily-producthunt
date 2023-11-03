import { WebClient } from '@slack/web-api'
import { NextResponse } from 'next/server'
import { supabase } from 'services'

export async function GET(req: Request) {
  const web = new WebClient(process.env.NEXT_PUBLIC_SLACK_TOKEN)
  const url = new URL(req.url)
  const code = url.searchParams.get('code') as string
  if (!code)
    return NextResponse.json({
      success: false,
      message: 'code가 존재하지 않습니다.'
    })

  const { incoming_webhook } = await web.oauth.v2.access({
    client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET,
    code,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/redirect/slack`
  })

  const { error } = await supabase
    .from('connections')
    .insert({ slack_webhook_url: incoming_webhook?.url })
  if (error) {
    console.error(error)
  }

  return NextResponse.json({ success: true, message: '통합이 완료되었습니다.' })
}
