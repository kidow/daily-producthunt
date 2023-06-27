import { NextResponse } from 'next/server'
import TelegramBot from 'node-telegram-bot-api'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const bot = new TelegramBot(process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN, {
    polling: true
  })
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id
    const supabase = createRouteHandlerClient<Database>({ cookies })
    try {
      const { data } = await supabase
        .from('connections')
        .select('telegram_chatting_id')
        .eq('telegram_chatting_id', chatId)
        .single()
      if (data) {
        await bot.sendMessage(
          chatId,
          `귀하는 이미 수신이 등록되어있습니다. 채팅 ID: ${chatId}`
        )
      } else {
        await supabase
          .from('connections')
          .insert({ telegram_chatting_id: chatId })
        await bot.sendMessage(
          chatId,
          `안녕하세요. 👋 반갑습니다. 이제부터 일간 ProductHunt에서 오는 콘텐츠를 수신하실 수 있습니다. 고객님의 채팅 ID는 ${chatId}입니다.`,
          { parse_mode: 'Markdown' }
        )
      }
    } catch (err) {
      console.log('start', err)
    }
  })
  return NextResponse.json({ success: true })
}
