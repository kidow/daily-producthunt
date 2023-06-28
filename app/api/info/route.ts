import { NextResponse } from 'next/server'
import { WebClient } from '@slack/web-api'
import * as Sentry from '@sentry/nextjs'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token') as string
  const channelId = url.searchParams.get('channelId')

  if (!token || !channelId)
    return NextResponse.json({ success: false, data: null })

  const web = new WebClient(token)
  try {
    const info = await web.conversations.info({ channel: channelId })
    return NextResponse.json({ success: true, data: info })
  } catch (err) {
    Sentry.captureException(err)
    return NextResponse.json({ success: false, data: null })
  }
}
