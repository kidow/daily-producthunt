import { redirect } from 'next/navigation'

interface Props {
  searchParams: {
    id: string
  }
}

export default function Page({ searchParams }: Props) {
  redirect(`/product/${searchParams.id}`)
}
