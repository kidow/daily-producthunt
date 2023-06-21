import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { WebClient } from '@slack/web-api'

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { count } = await supabase
    .from('connections')
    .select('id', { count: 'exact' })
  const web = new WebClient(process.env.NEXT_PUBLIC_SLACK_TOKEN)
  await web.chat.postMessage({
    channel: 'D05D1L17KQT',
    text: `새 구독자가 생겼습니다. 총 ${count || 0}명`
  })
  return NextResponse.json({ success: true })
}
