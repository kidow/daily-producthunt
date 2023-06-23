import { NextResponse } from 'next/server'
import TelegramBot from 'node-telegram-bot-api'

export async function POST(req: Request) {
  const bot = new TelegramBot(process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN, {
    polling: true
  })
  const { message } = await req.json()
  console.log('message', message)
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id
    await bot.sendMessage(
      chatId,
      `안녕하세요. 👋 반갑습니다. 이제부터 일간 ProductHunt에서 오는 콘텐츠를 수신하실 수 있습니다. 당신의 채팅 ID는 ${chatId}입니다.`,
      { parse_mode: 'Markdown' }
    )
  })
  return NextResponse.json({ success: true })
}
