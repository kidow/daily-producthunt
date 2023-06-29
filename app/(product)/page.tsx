import { Products } from 'templates'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data, count } = await supabase
    .from('histories')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(10)
  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="mb-4">
        <Link
          href="https://kidow.notion.site/93dbf7ddc40640ab98675faf728e28b5?v=4e63ecae497844098f406f2a9ab5cb7e&pvs=4"
          target="_blank"
          className="font-semibold hover:underline"
        >
          기존 전송 내역 보기 →
        </Link>
      </div>
      {!!data && <Products list={data} total={count} />}
    </div>
  )
}
