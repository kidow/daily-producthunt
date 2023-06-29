import { ImageResponse } from 'next/server'
import { supabase } from 'services'

export const runtime = 'edge'

export const alt = '일간 ProductHunt'
export const contentType = 'image/png'

export default async function Image({
  params: { id }
}: {
  params: { id: string }
}) {
  const { data } = await supabase
    .from('histories')
    .select('*')
    .eq('id', id)
    .single()
  return new ImageResponse(
    (
      <div tw="h-full w-full flex items-start justify-start bg-white relative">
        <div tw="flex items-start justify-start h-full">
          <img
            style={{ objectFit: 'cover' }}
            tw="absolute inset-0 w-full h-full"
            src={data?.cover_url}
          />
          <div tw="bg-black absolute inset-0 bg-opacity-70"></div>
          <div tw="flex items-center w-full h-full px-20">
            <div tw="flex-1 flex flex-col mr-20 text-white">
              <h1 tw="text-[96px] font-black">{data?.name}</h1>
              <div tw="text-[48px] font-medium">{data?.title}</div>
            </div>
            <div tw="flex relative">
              <img
                style={{ objectFit: 'cover' }}
                tw="mx-auto w-[280px] h-[280px] rounded-full"
                src={data?.icon_url}
              />
            </div>
          </div>
        </div>
      </div>
    )
  )
}
