import { Backdrop, Toast } from 'containers'
import './globals.css'
import 'dayjs/locale/ko'
import type { Metadata } from 'next'

export interface Props extends ReactProps {}

export function generateMetadata(): Metadata {
  const title = '일간 ProductHunt'
  const description = '매일매일 ProductHunt 상위 5개 제품을 소개합니다.'
  return {
    title,
    description,
    applicationName: title,
    generator: 'Next.js',
    keywords: ['nextjs', 'producthunt', 'vercel', 'tailwindcss', 'typescript'],
    themeColor: '#da552f',
    creator: 'kidow',
    publisher: 'Vercel',
    robots: 'index, follow',
    alternates: {
      canonical: 'https://daily-producthunt.kidow.me'
    },
    openGraph: {
      title,
      description,
      url: 'https://daily-producthunt.kidow.me'
    },
    twitter: {
      title,
      description,
      creator: '__kidow__',
      card: 'summary_large_image'
    },
    verification: {
      google: 'dpMF3-oHfMYFVkjgJpIJSGM_W_aL_gSFFnmWHM90NHU',
      other: {
        'naver-site-verification': 'f9be48b5bf4739e1027a3d4405d983a439c4a6e1'
      }
    },
    category: 'Media'
  }
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
