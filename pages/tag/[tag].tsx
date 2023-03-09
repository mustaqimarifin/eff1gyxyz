import SearchLayout from "layouts/search";
import { getAllPosts, getAllTags } from "lib/notion";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Post, TagObj } from "types";

export type SearchTags = {
  tags: TagObj;
  posts: Post[];
  currentTag: number;
};
export default function Tag({ tags, posts, currentTag }: SearchTags) {
  return <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />;
}

export async function getStaticProps({ params }: { params: Params }) {
  const currentTag = params.tag;
  const posts = await getAllPosts({ includedPages: false });
  const tags = getAllTags(posts);
  const filteredPosts = posts.filter(
    (post) => post && post.tags && post.tags.includes(currentTag)
  );
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ includedPages: false });
  const tags = getAllTags(posts);
  return {
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
    fallback: true,
  };
}
