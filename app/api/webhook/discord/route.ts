import { NextResponse } from 'next/server'
import { supabase } from 'services'

export async function POST(req: Request) {
  const { webhookUrl } = await req.json()
  if (!webhookUrl)
    return NextResponse.json({
      success: false,
      message: 'URL이 전달되지 않았습니다.'
    })
  const { data } = await supabase
    .from('connections')
    .select('discord_webhook_url')
    .eq('discord_webhook_url', webhookUrl)
    .single()
  if (data) {
    return NextResponse.json({
      success: false,
      message: '이미 등록되어 있습니다.'
    })
  }
  const { error } = await supabase
    .from('connections')
    .insert({ discord_webhook_url: webhookUrl })
  if (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      message:
        '에러가 발생했습니다. 문제가 지속된다면 https://a22k.short.gy/VniaWA 에서 문의바랍니다.'
    })
  }
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        username: '일간 ProductHunt',
        avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publics/daily-producthunt.png`,
        content: '성공적으로 연결되었습니다.'
      }),
      cache: 'no-cache'
    })
    return NextResponse.json({
      success: true,
      message: '완료되었습니다.'
    })
  } catch (err) {
    console.log(err)
    return NextResponse.json({
      success: false,
      message:
        '에러가 발생했습니다. 문제가 지속된다면 https://a22k.short.gy/VniaWA 에서 문의바랍니다.'
    })
  }
}
