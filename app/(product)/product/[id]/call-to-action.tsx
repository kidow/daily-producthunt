'use client'

import { Icon, IconButton } from 'components'
import Link from 'next/link'
import type { FC } from 'react'

export interface Props {}

const CallToAction: FC<Props> = () => {
  return (
    <section className="mx-auto max-w-lg space-y-4 rounded-xl border border-neutral-800 bg-diagonal-lines px-4 py-8 text-center">
      <h3 className="select-none text-lg font-semibold">
        매일 ProductHunt 제품들을 요약해서 전달합니다.
      </h3>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-4 gap-4">
          <Link
            href="https://slashpage.com/daily-producthunt/k4w67rj24qve1m5yq8ep"
            target="_blank"
          >
            <IconButton>
              <Icon.Slack />
            </IconButton>
          </Link>
          <Link
            href="https://slashpage.com/daily-producthunt/8qpv5x427x533mkyn3dw"
            target="_blank"
          >
            <IconButton>
              <Icon.Notion />
            </IconButton>
          </Link>
          <Link
            href="https://slashpage.com/daily-producthunt/8ndvwx7283pk5m3z6jpg"
            target="_blank"
          >
            <IconButton>
              <Icon.Discord />
            </IconButton>
          </Link>
          <Link
            href="https://slashpage.com/daily-producthunt/j4z7pvx2keg112ek8653"
            target="_blank"
          >
            <IconButton>
              <Icon.Telegram />
            </IconButton>
          </Link>
          <Link
            href="https://slashpage.com/daily-producthunt/wy9e1xp2x67zk27k35vz"
            target="_blank"
          >
            <IconButton>
              <Icon.Jandi />
            </IconButton>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
