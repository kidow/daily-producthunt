import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { WithContext, SoftwareApplication } from 'schema-dts'
import { supabase } from 'services'
import { CallToAction } from 'templates'
import Image from 'next/image'

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4">
        <Image
          src={data.cover_url}
          width={864}
          height={510}
          priority
          alt="cover image"
          className="mb-4 w-full rounded md:mb-10"
        />

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
                href={data.url + '/?ref=daily_producthunt'}
                target="_blank"
                className="text-2xl font-semibold text-blue-500 hover:underline"
              >
                {data.name}
              </Link>
            </h1>
            <p className="text-lg">{data.title}</p>
            <ul className="list-inside list-disc text-neutral-200">
              <li className="break-keep">{data.intro}</li>
              <li className="break-keep">{data.core}</li>
              <li className="break-keep">{data.platform}</li>
              <li className="break-keep">{data.pricing}</li>
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
