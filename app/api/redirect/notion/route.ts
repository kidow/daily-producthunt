import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { request } from 'services'
import { cookies } from 'next/headers'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const {
    owner: {
      user: {
        person: { email }
      }
    },
    access_token,
    duplicated_template_id
  } = await request<INotion['Oauth']>('https://api.notion.com/v1/oauth/token', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(
        `${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}:${process.env.NEXT_PUBLIC_NOTION_CLIENT_SECRET}`
      )}`
    }),
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code: url.searchParams.get('code') as string,
      redirect_uri: 'https://daily-producthunt.kidow.me/api/redirect/notion'
    })
  })

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { data } = await supabase
    .from('connections')
    .select('email')
    .eq('email', email)
    .single()
  if (data) {
    await supabase
      .from('connections')
      .update({
        notion_token: access_token,
        notion_database_id: duplicated_template_id
      })
      .eq('email', email)
  } else {
    await supabase.from('connections').insert({
      email,
      notion_token: access_token,
      notion_database_id: duplicated_template_id
    })
  }

  return NextResponse.json({
    success: true,
    message: '통합이 완료되었습니다. 이 창을 닫아주세요.'
  })
}
