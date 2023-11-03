import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabase } from 'services'

export async function GET(req: Request) {
  const ip = headers().get('x-real-ip')
  const url = new URL(req.url)
  const id = url.searchParams.get('id') as string
  if (!id) return NextResponse.json({ data: {}, ip: null }, { status: 400 })
  const { data } = await supabase
    .from('histories')
    .select(
      `
    *,
    likes (*)
  `
    )
    .eq('id', id)
    .single()
  return NextResponse.json({ data, ip }, { status: 200 })
}
