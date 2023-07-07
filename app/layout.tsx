import { Backdrop, Toast } from 'containers'
import './globals.css'
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
      canonical: process.env.NEXT_PUBLIC_BASE_URL
    },
    openGraph: {
      title,
      description,
      url: process.env.NEXT_PUBLIC_BASE_URL
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
    category: 'Media',
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL)
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
