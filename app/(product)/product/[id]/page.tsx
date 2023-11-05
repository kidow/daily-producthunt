import { Post } from 'containers'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import type { SoftwareApplication, WithContext } from 'schema-dts'
import { supabase } from 'services'

import CallToAction from './call-to-action'

export const runtime = 'edge'

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await supabase
    .from('histories')
    .select('*')
    .eq('id', params.id)
    .single()
  return {
    title: `${data?.name} - ${data?.title}`,
    description: data?.intro,
    keywords: `producthunt, ${data?.tags.join(', ')}`,
    openGraph: {
      title: `${data?.name} - ${data?.title}`,
      description: data?.intro,
      url: data?.url
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data?.name} - ${data?.title}`,
      description: data?.intro
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL)
  }
}

export async function generateStaticParams() {
  const { data } = await supabase.from('histories').select('id')
  return data || []
}

export default async function Page({ params }: Props) {
  const ip = headers().get('x-real-ip')
  const { data } = await supabase
    .from('histories')
    .select(
      `
      *,
      likes (*)
    `
    )
    .eq('id', params.id)
    .single()
  if (!data) notFound()
  const jsonLd: WithContext<SoftwareApplication> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    operatingSystem: data.platform,
    offers: {
      '@type': 'Offer',
      price: data.pricing
    }
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4">
        <Post
          {...data}
          likes={data.likes.map((item) => item.ip_address)}
          ip={ip}
        />
        <CallToAction />
      </div>
    </>
  )
}
