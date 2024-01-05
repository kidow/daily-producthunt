import { NextResponse } from 'next/server'

export async function GET() {
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
