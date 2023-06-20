import { Backdrop, Toast } from 'containers'
import './globals.css'
import 'dayjs/locale/ko'

export interface Props extends ReactProps {}

export const metadata = {
  title: '일간 ProductHunt',
  description: '매일매일 ProductHunt 상위 5개 제품을 소개합니다.'
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Backdrop />
        <Toast />
      </body>
    </html>
  )
}
