import BLOG from 'blog.config'
import formatDate from 'lib/formatDate'
import { yespls } from 'lib/utils'
import Link from 'next/link'
import useSWR from 'swr'
import { type Post } from 'types'

import { type Views } from './ViewCounter'

const BlogPost = ({ post }: { post: Post }) => {
  const { data } = useSWR<Views>(`/api/views/${post.slug}`, yespls)
  const views = data?.total
  return (
    <Link href={`posts/${post.slug}`}>
      <article key={post.id} className="mb-6 md:mb-8">
        <header className="flex flex-col justify-between md:flex-row md:items-baseline">
          <h2 className="mb-2 cursor-pointer text-lg font-bold text-black dark:text-gray-100 md:text-xl">
            {post.title}
          </h2>
        </header>
          <div className="mb-16 flex flex-col items-start uppercase text-center font-semibold  justify-between w-full mt-2 md:flex-row md:items-center">
            <div className="flex gap-2  items-center mt-2 text-sm text-gray-600 dark:text-gray-400  md:mt-0">
              { formatDate(post?.date?.start_date || post.createdTime, BLOG.lang) }
              { ` • ` }

              { `${views ? new Number(views).toLocaleString() : '–––'} views` }
              { ` • ` }
              <div className="flex space-x-2">
                { post.tags?.length &&
                  post.tags
                    .slice(0)
                    .map((tag: any, index: any) => (
                      <div key={ index }>{ tag }</div>
                    )) }
              </div>
            </div>
          </div>
{/*           <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            {formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}
          </time>
          <p className="mb-4 w-32 text-left text-gray-500 md:mb-0 md:text-right">
            {`${views ? new Number(views).toLocaleString() : '–––'} views`}
          </p> */}

        <main>
          <p className="hidden font-serif leading-8 text-gray-700 dark:text-gray-300 md:block">
            {post.summary}
          </p>
        </main>
      </article>
    </Link>
  )
}

export default BlogPost
