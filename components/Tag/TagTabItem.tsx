import clsx from 'clsx'
import { Twemoji } from 'components/Twemoji'
import { getTagDataBySlug, type TagSlug } from 'lib/tags'
import Link from 'next/link'
import { useMemo } from 'react'

type Props =
  | {
      tagKey: string
      selected: boolean
      count: number
      postType?: 'post' | 'project'
    }
  | {
      tagKey: string
      selected: boolean
      root: boolean
      postType?: 'post' | 'project'
    }

export const TagTabItem: React.FC<Props> = ({
  tagKey,
  selected,
  postType = 'post',
  ...rest
}) => {
  const castKey = tagKey as TagSlug

  const linkUrl = useMemo(() => {
    if (postType === 'project') {
      if (selected || !('count' in rest)) {
        return '/projects'
      } else {
        return `/projects/tag/${encodeURIComponent(tagKey)}`
      }
    }

    if (selected || !('count' in rest)) {
      return '/'
    } else {
      return `/tag/${encodeURIComponent(tagKey)}`
    }
  }, [postType, rest, selected, tagKey])

  const tagData = getTagDataBySlug(castKey)
  return (
    <li
      className={clsx(
        'mr-3 block min-w-max whitespace-nowrap rounded-lg font-bold',
        {
          'border-gray-100 text-gray-400 dark:border-gray-700 dark:text-gray-300':
            !selected,
          'dark:text-night bg-gray-200 text-gray-700': selected,
        }
      )}
    >
      <Link href={linkUrl} scroll={false}>
        <a className="flex items-center px-4 py-2">
          {tagData?.emoji && <Twemoji emoji={tagData.emoji} size={20} />}
          <span
            className={clsx({
              'ml-2': !!tagData?.emoji,
            })}
          >
            {'count' in rest
              ? `${tagData?.name ?? tagKey} (${rest.count})`
              : `${tagData?.name ?? tagKey}`}
          </span>
        </a>
      </Link>
    </li>
  )
}
