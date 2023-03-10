/* eslint-disable react/prop-types */
import BLOG from 'blog.config';
import { createSSGHelpers } from '@trpc/react/ssg';
import prisma from 'lib/prisma';
import Layout from 'layouts/layout';
import { getAllPosts, getPostBlocks } from 'lib/notion';
import { createHash } from 'crypto';
import superjson from 'superjson';
import { GetStaticPropsContext } from 'next';
import { Post } from 'types';
import { ExtendedRecordMap } from 'notion-types';
import { useRouter } from 'next/router';
import { appRouter } from 'server/router';

type BlogPostProps = {
  previewImagesEnabled: boolean;
  post: Post;
  blockMap: ExtendedRecordMap;
  emailHash: string;
};

const BlogPost = ({
  previewImagesEnabled,
  post,
  blockMap,
  emailHash,
  ...props
}: BlogPostProps) => {
  const slug = useRouter().query.slug as string;
  if (!post) return null;

  return (
    <>
      <Layout
        previewImagesEnabled={previewImagesEnabled}
        blockMap={blockMap}
        rootPageId={BLOG.notionPageId}
        post={post}
        emailHash={emailHash}
        fullWidth={post.fullWidth}
        slug={typeof slug === 'string' ? slug : null}
        {...props}
      />
    </>
  );
};

export async function getStaticPaths() {
  const posts = await getAllPosts({ includedPages: true });
  return {
    paths: posts.map((row) => `${BLOG.path}/${row.slug}`),
    fallback: true,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const posts = await getAllPosts({ includedPages: true });
  const slug = context.params?.slug;
  const post = posts.find((t) => t.slug === slug);
  const blockMap = await getPostBlocks(post?.id);
  const emailHash = createHash('md5')
    .update(BLOG.email)
    .digest('hex')
    .trim()
    .toLowerCase();

  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: {
      req: undefined,
      res: undefined,
      prisma,
      session: undefined,
    },
    transformer: superjson,
  });

  //@ts-ignore
  const data = await ssg.fetchQuery('post.getBySlug', { slug });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post, blockMap, emailHash, trpcState: ssg.dehydrate(), slug },
    revalidate: 60,
  };
}

export default BlogPost;
