'use client'

import { Pagination } from 'components'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { useState } from 'react'
import type { FC, FormEvent } from 'react'
import { backdrop, supabase, useUsermaven } from 'services'

dayjs.extend(relativeTime)

export interface Props {
  list: Database['public']['Tables']['histories']['Row'][]
  total: number | null
}

const Products: FC<Props> = (props) => {
  const [list, setList] = useState<
    Database['public']['Tables']['histories']['Row'][]
  >(props.list || [])
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(props.total || 0)
  const [search, setSearch] = useState<string>('')
  const usermaven = useUsermaven()

  const get = async (page: number = 1) => {
    backdrop.open()

    if (search) {
      const { data, count } = await supabase
        .from('histories')
        .select('*', { count: 'exact' })
        .ilike('name', `%${search}%`)
        .order('created_at', { ascending: false })
        .range((page - 1) * 10, page * 10 - 1)
        .limit(10)
      setPage(page)
      setList(data || [])
      setTotal(count || 0)
    } else {
      const { data, count } = await supabase
        .from('histories')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * 10, page * 10 - 1)
        .limit(10)
      setPage(page)
      setList(data || [])
      setTotal(count || 0)
    }

    backdrop.close()
  }

  const onSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!search) {
      get()
      return
    }
    backdrop.open()
    const { data, count } = await supabase
      .from('histories')
      .select('*', { count: 'exact' })
      .ilike('name', `%${search}%`)
      .order('created_at', { ascending: false })
      .range((page - 1) * 10, page * 10 - 1)
      .limit(10)
    backdrop.close()

    setPage(1)
    setList(data || [])
    setTotal(count || 0)
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="https://kidow.notion.site/93dbf7ddc40640ab98675faf728e28b5?v=4e63ecae497844098f406f2a9ab5cb7e&pvs=4"
          target="_blank"
          className="font-semibold hover:underline"
        >
          기존 전송 내역 보기 →
        </Link>
        <form onSubmit={onSearch}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색 (Enter)"
            className="rounded border border-neutral-700 bg-transparent px-3 py-2 ring-primary duration-150 focus:border-primary focus:outline-none focus:ring"
          />
        </form>
      </div>
      <ul className="space-y-6">
        {list.map((item) => (
          <li key={item.id}>
            <Link
              className="group flex gap-4"
              href={`/product/${item.id}`}
              scroll={false}
              onClick={() =>
                usermaven.id({
                  id: 'lzL24K3kYw',
                  email: 'user@domain.com',
                  created_at: '2021-01-20T09:55:35',
                  first_name: 'John',
                  last_name: 'Smith',
                  custom: {
                    plan_name: 'premium'
                  },
                  company: {
                    id: 'uPq9oUGrIt',
                    name: 'Usermaven',
                    created_at: '2021-01-20T09:55:35',

                    custom: {
                      plan: 'enterprise',
                      industry: 'Technology',
                      website: 'https://usermaven.com',
                      employees: 20
                    }
                  }
                })
              }
            >
              <img
                src={item.icon_url}
                alt="logo"
                className="h-12 w-12 rounded md:h-20 md:w-20"
              />
              <div className="space-y-0.5 md:space-y-1">
                <h3 className="inline-block overflow-hidden text-lg font-semibold">
                  <span className="relative block after:absolute after:bottom-1 after:left-0 after:h-1.5 after:w-full after:origin-bottom-right after:-translate-x-full after:bg-primary after:opacity-50 after:transition-transform after:duration-150 after:content-[''] after:group-hover:translate-x-0">
                    {item.name}
                  </span>
                </h3>
                <p className="break-keep text-neutral-400">{item.title}</p>
                <ul className="flex flex-wrap items-center gap-2 pt-1">
                  {item.tags.map((tag, key) => (
                    <li
                      key={key}
                      className="rounded-full border border-neutral-700 px-1.5 py-0.5 text-xs text-neutral-400"
                    >
                      {tag}
                    </li>
                  ))}
                  <li className="text-xs text-neutral-500">
                    {dayjs(item.created_at).locale('ko').fromNow()}
                  </li>
                </ul>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <Pagination
          page={page}
          onChange={(page) => get(page)}
          total={total}
          size={10}
        />
      </div>
    </>
  )
}

export default Products
