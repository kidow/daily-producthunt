import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const result = await fetch(
    `https://www.tistory.com/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_TISTORY_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_TISTORY_SECRET_KEY}&redirect_uri=https://daily-producthunt.kidow.me/api/redirect/tistory&code=${code}&grant_type=authorization_code`
  )
  const text = await result.text()

  return NextResponse.json({ text })
}
