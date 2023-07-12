import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { count } = await supabase
    .from('connections')
    .select('id', { count: 'exact' })

  await fetch(process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      text: `새 구독자가 생겼습니다. 총 ${count || 0}명`
    })
  })
  return NextResponse.json({ success: true })
}
