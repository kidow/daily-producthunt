'use client'

import * as Sentry from '@sentry/nextjs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { IS_DEV, cn } from 'services'

interface Props {
  list: string[]
  ip: string | null
}

export default function Like({ ip, ...props }: Props): JSX.Element {
  const supabase = createClientComponentClient<Database>()
  const [list, setList] = useState<string[]>(props.list || [])
  const [isAnimated, setIsAnimated] = useState(false)
  const params = useParams()

  const onClick = async () => {
    if (!ip) return

    if (list.indexOf(ip || '') === -1) {
      const { error } = await supabase
        .from('likes')
        .insert({ product_id: params.id as string, ip_address: ip })
        .select(`*`)
      if (error) {
        if (!IS_DEV) Sentry.captureException(error)
        return
      }
      setIsAnimated(true)
    } else {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('ip_address', ip)
      if (error) {
        if (!IS_DEV) Sentry.captureException(error)
        return
      }
    }

    const { data } = await supabase
      .from('likes')
      .select(`*`)
      .eq('product_id', params.id)
    setList(data?.map((item) => item.ip_address) || [])
  }

  const isLiked: boolean = useMemo(
    () => list.indexOf(ip || '') !== -1,
    [list, ip]
  )
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex relative rounded-full border w-20 py-2 justify-end items-center gap-2',
        isLiked ? 'border-red-500' : 'border-neutral-700'
      )}
    >
      <div
        className={cn(
          "w-[50px] absolute left-0 top-1/2 -translate-y-1/2 h-[50px] bg-[url('https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png')] bg-no-repeat bg-[length:2900%]",
          { 'animate-heart-burst': isAnimated },
          isLiked ? 'bg-right' : 'bg-left'
        )}
        onAnimationEnd={() => setIsAnimated(false)}
      />
      <div className={cn('w-[50px]', { 'text-red-500': isLiked })}>
        {list.length}
      </div>
    </button>
  )
}
