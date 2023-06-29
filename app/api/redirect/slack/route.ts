import { WebClient } from '@slack/web-api'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import * as Sentry from '@sentry/nextjs'

export async function GET(req: Request) {
  const web = new WebClient(process.env.NEXT_PUBLIC_SLACK_TOKEN)
  const url = new URL(req.url)
  const { incoming_webhook } = await web.oauth.v2.access({
    client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET,
    code: url.searchParams.get('code') as string,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/redirect/slack`
  })

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { error } = await supabase
    .from('connections')
    .upsert({ slack_webhook_url: incoming_webhook?.url })
  if (error) {
    Sentry.captureException(error)
  }

  return NextResponse.json({ success: true, message: '통합이 완료되었습니다.' })
}
