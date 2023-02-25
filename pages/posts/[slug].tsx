/* eslint-disable react/prop-types */
import BLOG from "blog.config";

import Layout from "layouts/layout";
import { getAllPosts, getPostBlocks } from "lib/notion";
import { createHash } from "crypto";

import { GetStaticPropsContext } from "next";
import { Post } from "types";
import { ExtendedRecordMap } from "notion-types";

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
        //slug={typeof slug === 'string' ? slug : null}
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
  const emailHash = createHash("md5")
    .update(BLOG.email)
    .digest("hex")
    .trim()
    .toLowerCase();

  return {
    props: { post, blockMap, emailHash },
    revalidate: 60,
  };
}

export default BlogPost;
