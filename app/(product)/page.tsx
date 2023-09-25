import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import Products from './products'

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
      {!!data && <Products list={data} total={count} />}
    </div>
  )
}
