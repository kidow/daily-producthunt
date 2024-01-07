import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  if (
    req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  await fetch(
    'https://discord.com/api/webhooks/1141695318375809074/NBwaR2RhE1UX8IjGHChR3vV_NHeVUQbvS4G2p5ibJ9Rb5hW_tndgrLTHOoj-8xVjnCuM',
    {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ content: 'Cron Job Test' })
    }
  )
  return NextResponse.json({ ok: true })
}
