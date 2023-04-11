import { yespls } from 'lib/utils'
import { useEffect } from 'react'
import useSWR from 'swr'
export type Views = {
  total: number
}
export default function ViewCounter({ slug }: { slug: string }) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, yespls)
  const views = data?.total

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    registerView()
  }, [slug])

  return (
    <span>{`${
      views && views > 0 ? views?.toLocaleString() : '–––'
    } views`}</span>
  )
}
