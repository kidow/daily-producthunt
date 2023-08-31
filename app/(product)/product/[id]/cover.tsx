'use client'

import Image from 'next/image'
import mediumZoom from 'medium-zoom'
import { useEffect } from 'react'

interface Props {
  url: string
}

export default function Cover({ url }: Props) {
  useEffect(() => {
    mediumZoom('[data-zoomable]', { background: 'rgba(0,0,0,0.5)' })
  }, [])
  return (
    <Image
      src={url}
      data-zoomable
      alt="cover image"
      width={864}
      height={510}
      priority
      className="mb-4 w-full rounded md:mb-10"
    />
  )
}
