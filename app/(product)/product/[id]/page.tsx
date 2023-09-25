import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { SoftwareApplication, WithContext } from 'schema-dts'
import { supabase } from 'services'

import CallToAction from './call-to-action'
import Cover from './cover'

export const dynamic = 'force-dynamic'

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
    title: `${data?.name} - ${data?.title} | 일간 ProductHunt`,
    description: data?.intro,
    keywords: `producthunt, ${data?.tags.join(', ')}`,
    openGraph: {
      title: `${data?.name} - ${data?.title} | 일간 ProductHunt`,
      description: data?.intro,
      url: data?.url
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data?.name} - ${data?.title} | 일간 ProductHunt`,
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
  const { data } = await supabase
    .from('histories')
    .select('*')
    .eq('id', params.id)
    .single()
  if (!data) {
    notFound()
  }
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

  function addRefParameterToURL(url: string) {
    const refParameter = 'ref=daily_producthunt'

    if (url.includes('?')) {
      return `${url}&${refParameter}`
    } else {
      return `${url}?${refParameter}`
    }
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4">
        <Cover url={data.cover_url} />

        <section className="mb-4 flex flex-col gap-4 md:m-10 md:flex-row md:gap-5">
          <Image
            src={data.icon_url}
            height={48}
            width={48}
            alt="logo"
            className="rounded md:h-20 md:w-20"
          />
          <div className="space-y-2">
            <h1>
              <Link
                href={addRefParameterToURL(data.url)}
                target="_blank"
                className="text-2xl font-semibold text-blue-500 hover:underline"
              >
                {data.name}
              </Link>
            </h1>
            <p className="text-lg">{data.title}</p>
            <ul className="space-y-4 text-neutral-200">
              <li className="break-keep">
                <label className="text-sm text-neutral-500">한 줄 소개</label>
                <p>{data.intro}</p>
              </li>
              <li className="break-keep">
                <label className="text-sm text-neutral-500">핵심 기능</label>
                <p>{data.core}</p>
              </li>
              <li className="break-keep">
                <label className="text-sm text-neutral-500">지원 플랫폼</label>
                <p>{data.platform}</p>
              </li>
              <li className="break-keep">
                <label className="text-sm text-neutral-500">가격 정책</label>
                <p>{data.pricing}</p>
              </li>
            </ul>
            <ul className="flex flex-wrap gap-2 pt-2">
              {data.tags.map((tag, key) => (
                <li
                  key={key}
                  className="rounded-full border border-neutral-700 bg-opacity-70 px-2 py-1 text-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CallToAction />
      </div>
    </>
  )
}
