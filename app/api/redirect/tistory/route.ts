import { NextResponse } from 'next/server'
import { request } from 'services'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const result = await request(
    `https://www.tistory.com/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_TISTORY_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_TISTORY_SECRET_KEY}&redirect_uri=http://localhost:3000/api/redirect/tistory&code=${code}&grant_type=authorization_code`
  )

  return NextResponse.json({ result })
}
