'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'

export const usePagination = ({
  total,
  size,
  page
}: {
  total: number
  size: number
  page: number
}) => {
  const DOTS = '...'
  const range = (start: any, end: any) => {
    let length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
  }

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(total / size)
    const totalPageNumbers = 6

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(page - 1, 1)
    const rightSiblingIndex = Math.min(page + 1, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [total, size, page])

  return paginationRange
}

export function useIntersectionObserver<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      options
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref.current])

  return [ref, entry?.isIntersecting || false]
}
