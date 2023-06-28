import { NextResponse } from 'next/server'
import { WebClient } from '@slack/web-api'

export async function POST(req: Request) {
  const { slackToken, slackChannelId } = await req.json()
  const web = new WebClient(slackToken)
  const result = await web.chat.postMessage({
    channel: slackChannelId,
    text: '이 메시지는 테스트 메시지입니다. 잘 전송되었다면 문제가 없는 것이니 안심하셔도 됩니다.'
  })
  return NextResponse.json({ success: result.ok, result })
}
