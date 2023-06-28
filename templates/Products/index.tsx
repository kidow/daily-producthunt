'use client'

import { Pagination, Product } from 'components'
import { useState } from 'react'
import type { FC } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { backdrop } from 'services'

export interface Props {
  list: Database['public']['Tables']['histories']['Row'][]
  total: number | null
}
interface State {}

const Products: FC<Props> = (props) => {
  const [list, setList] = useState<
    Database['public']['Tables']['histories']['Row'][]
  >(props.list || [])
  const [page, setPage] = useState<number>(1)
  const supabase = createClientComponentClient<Database>()

  const get = async (page: number = 1) => {
    backdrop(true)
    const { data, error } = await supabase
      .from('histories')
      .select('*')
      .order('created_at', { ascending: false })
      .range((page - 1) * 10, page * 10 - 1)
      .limit(10)
    setPage(page)
    setList(data || [])
    backdrop(false)
  }

  return (
    <>
      <ul className="space-y-6">
        {list.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            iconUrl={item.icon_url}
            name={item.name}
            title={item.title}
            tags={item.tags}
            createdAt={item.created_at}
          />
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <Pagination
          page={page}
          onChange={(page) => get(page)}
          total={props.total || 0}
          size={10}
        />
      </div>
    </>
  )
}

export default Products
