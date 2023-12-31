import { NextResponse } from 'next/server'
import { supabase } from 'services'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code') as string
  if (!code)
    return NextResponse.json({
      success: false,
      message: '코드가 존재하지 않습니다.'
    })
  const res = await fetch('https://api.notion.com/v1/oauth/token', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(
        `${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}:${process.env.NEXT_PUBLIC_NOTION_CLIENT_SECRET}`
      )}`
    }),
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/redirect/notion`
    })
  })
  const { access_token, duplicated_template_id } = await res.json()

  if (!duplicated_template_id) {
    return NextResponse.json({
      success: false,
      message:
        '템플릿이 존재하지 않습니다. 개발자가 제공한 템플릿을 선택했는지 확인해주세요. 만약 문제가 지속된다면 커뮤니티에 제보바랍니다.'
    })
  }

  const { error } = await supabase.from('connections').insert({
    notion_token: access_token,
    notion_database_id: duplicated_template_id
  })
  if (error) {
    console.log(error)
  }

  return NextResponse.json({
    success: true,
    message: '통합이 완료되었습니다. 이 창을 닫아주세요.'
  })
}
