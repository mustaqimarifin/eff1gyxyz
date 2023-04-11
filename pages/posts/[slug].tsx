/* eslint-disable react/prop-types */
import BLOG from 'blog.config'
import { createHash } from 'crypto'
//import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import Layout from 'layouts/layout'
import { getAllPosts, getPostBlocks } from 'lib/notion'
//import superjson from "superjson";
import { type GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { type ExtendedRecordMap } from 'notion-types'
import { type Post } from 'types'
//import { prisma } from "server10/db";
//import { appRouter } from "server10/api/root";

type BlogPostProps = {
  previewImagesEnabled: boolean
  post: Post
  blockMap: ExtendedRecordMap
  emailHash: string
}

const BlogPost = ({
  previewImagesEnabled,
  post,
  blockMap,
  emailHash,
  ...props
}: BlogPostProps) => {
  const slug = useRouter().query.slug as string
  if (!post) return null

  return (
    <>
      <Layout
        previewImagesEnabled={BLOG.previewImagesEnabled}
        blockMap={blockMap}
        rootPageId={BLOG.notionPageId}
        post={post}
        emailHash={emailHash}
        fullWidth={post.fullWidth}
        slug={typeof slug === 'string' ? slug : null}
        {...props}
      />
    </>
  )
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ includedPages: true })
  return {
    paths: posts.map((row) => `/posts/${row.slug}`),
    fallback: true,
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const posts = await getAllPosts({ includedPages: true })
  const slug = context.params?.slug
  const post = posts.find((t) => t.slug === slug)
  const blockMap = await getPostBlocks(post?.id)
  const emailHash = createHash('md5')
    .update(BLOG.email)
    .digest('hex')
    .trim()
    .toLowerCase()

  /*   const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {
      req: undefined,
      res: undefined,
      prisma,
      session: undefined,
    },
    transformer: superjson,
  }); */

  //@ts-ignore
  /*   const data = await ssg.fetchQuery('post.getBySlug', { slug });

  if (!data) {
    return {
      notFound: true,
    };
  }
 */
  return {
    props: { post, blockMap, emailHash },
    revalidate: 60,
  }
}

export default BlogPost
