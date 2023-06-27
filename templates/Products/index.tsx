'use client'

import { Product, Spinner } from 'components'
import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { request, useIntersectionObserver } from 'services'

export interface Props {
  length: number
  nextCursor: string | null
  hasMore: boolean
}
interface State {}

const Products: FC<Props> = ({ length, nextCursor, ...props }) => {
  if (length !== 20) return null
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>()
  const [list, setList] = useState<any[]>([])
  const [cursor, setCursor] = useState<string | null>(nextCursor)
  const [hasMore, setHasMore] = useState<boolean>(props.hasMore)
  const [isLoading, setIsLoading] = useState(false)

  const get = async () => {
    setIsLoading(true)
    const { results, next_cursor, has_more } = await request<{
      results: any[]
      next_cursor: string | null
      has_more: boolean
    }>(`/api/products?cursor=${cursor}`)
    setList((prevList) => [...prevList, ...results])
    setCursor(next_cursor)
    setHasMore(has_more)
    setIsLoading(false)
  }

  useEffect(() => {
    if (hasMore && isIntersecting) get()
  }, [isIntersecting, hasMore])
  return (
    <>
      {list.map((item) => (
        <Product
          key={item.id}
          id={item.id}
          iconUrl={item.icon.external.url}
          name={item.properties['이름'].title[0].text.content}
          title={item.properties['타이틀'].rich_text[0].text.content}
          tags={item.properties.태그.multi_select}
          createdAt={item.created_time}
        />
      ))}
      <div ref={ref} />
      {isLoading && (
        <div className="flex justify-center">
          <Spinner className="h-6 w-6" />
        </div>
      )}
    </>
  )
}

export default Products
