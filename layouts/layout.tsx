/* eslint-disable @typescript-eslint/no-unsafe-return */
import BLOG from 'blog.config'
import clsx from 'clsx'
import CommentComponent from 'components/CommentComponent'
import Container from 'components/Container'
import DickPics from 'components/Pix'
import { TableOfContents } from 'components/TableOfContents'
import TagItem from 'components/TagItem'
import ViewCounter from 'components/ViewCounter'
import formatDate from 'lib/formatDate'
import { mapImageUrl } from 'lib/notion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  type Block,
  type Decoration,
  type ExtendedRecordMap,
} from 'notion-types'
//import { Komments } from "components/Komment";
import React from 'react'
//import TagItem from "components/TagItem";
import { type MapImageUrlFn, NotionRenderer } from 'react-notion-x'
import { type Post } from 'types'

import ME from '../public/pw.png'

const enableCommentArea = BLOG.comment.provider !== ''

export function textDecorationsToString (decorations: Decoration[]): string {
  return decorations.map((decoration) => decoration[0]).join('')
}

const mapPageUrl = (id: string) => {
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // add / remove any prism syntaxes here
    await Promise.all([
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-go.js'),
      import('prismjs/components/prism-graphql.js'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-sql.js'),
    ])
    return m.Code
  })
)
/* const CodeBlock = dynamic(() =>
  import('components/CodeBlock').then(async (m) => m.CodeBlock)
) */
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false,
  }
)

const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => {
      m.Modal.setAppElement('.notion-viewport')
      return m.Modal
    }),
  {
    ssr: false,
  }
)

type Props = {
  rootPageId?: string
  rootDomain?: string
  blockMap: ExtendedRecordMap
  post: Post
  emailHash?: string
  fullWidth?: boolean
  previewImagesEnabled?: boolean
  mapImageUrl?: MapImageUrlFn | null
  //onlyContents?: boolean,
  //tweet?: typeof Tweet,
  slug: string
}

const Layout: React.FC<Props> = ({
  slug,
  blockMap,
  rootPageId,
  rootDomain,
  post,
  fullWidth = false,
}: Props) => {
  const router = useRouter()

  const components = React.useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
      Code,
      /* Code: ({ block }: { block: Block }) => {
        return (
          <CodeBlock
            language={textDecorationsToString(
              block.properties.language
            ).toLowerCase()}
            text={textDecorationsToString(block.properties.title)}
          />
        )
      }, */
      Collection,
      Pdf,
      Modal,
    }),
    []
  )

  return (
    <Container
      layout="blog"
      title={ post.title }
      description={ post.summary }
      // date={new Date(post.publishedAt).toISOString()}
      type="article"
      fullWidth={ fullWidth }
    >
      {/*       <div className="full-cover max-h-60 overflow-hidden object-center ">
        <DickPics
          alt={post.title}
          width={1200}
          height={400}
          src={`${post.slug}/banner.jpg`}
          className=" shadow-xl"
        />
      </div> */}
      <section>
        <header className="-mt-4">
          <div className=" font-serif text-3xl font-semibold capitalize text-black dark:text-white">
            { post.title }
          </div>
          { post?.type[0] !== 'Page' && (
            <div className="mb-6 flex flex-col items-start uppercase text-center font-semibold  justify-between w-full mt-2 md:flex-row md:items-center">
              <div className="flex gap-2  items-center mt-2 text-xs text-gray-600 dark:text-gray-400  md:mt-0">
                { formatDate(post?.date?.start_date || post.createdTime, BLOG.lang) }
                { ` • ` }
                <ViewCounter slug={ post.slug } />
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


          ) }
          { blockMap && (
            <div className="self-stretch -mt-4 flex flex-col items-center lg:flex-row lg:items-stretch">
              { !fullWidth && <div className="flex-1 hidden lg:block" /> }
              <div className={ fullWidth ? 'flex-1 pr-4' : 'flex-none w-full max-w-3xl px-4' }>
                <NotionRenderer recordMap={ blockMap }
                  rootDomain={ rootDomain }
                  rootPageId={ rootPageId }
                  previewImages={ !!blockMap.preview_images }
                  //mapImageUrl={mapImageUrl}
                  components={ components }
                  mapPageUrl={ mapPageUrl } fullPage={ false } />
              </div>
              <div className={ clsx('order-first lg:order-[unset] w-full lg:w-auto max-w-2xl lg:max-w-[unset] lg:min-w-[160px]', fullWidth ? 'flex-none' : 'flex-1') }>
                {/* `65px` is the height of expanded nav */ }
                {/* TODO: Remove the magic number */ }
                <TableOfContents permissions={ undefined } blockMap={ blockMap } className="pt-3 sticky" style={ { top: '65px' } } />
              </div>
            </div>
          ) }

          {/*         { blockMap && (
          <article className=" -mt-4">
            <NotionRenderer
              recordMap={ blockMap }
              rootDomain={ rootDomain }
              rootPageId={ rootPageId }
              previewImages={ !!blockMap.preview_images }
              //mapImageUrl={mapImageUrl}
              components={ components }
              mapPageUrl={ mapPageUrl }
            />
          </article>
        ) } */}
        </header>
      </section>

      <div
        className={
          clsx(
            'flex justify-between font-medium text-gray-500 dark:text-gray-400',
            {
              'mb-4': enableCommentArea,
            }
          )
        }
      >
        <button
          onClick={ () => void router.push(BLOG.path || '/') }
          className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
        >
          ← BACK
        </button>
        <button
          onClick={ () => window.scrollTo({ top: 0, behavior: 'smooth' }) }
          className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
        >
          ↑ TOP
        </button>
      </div >
      <CommentComponent slug={ slug } />
    </Container >
  )
}

export default Layout
