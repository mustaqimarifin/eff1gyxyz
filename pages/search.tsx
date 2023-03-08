import { getAllPosts, getAllTags } from 'lib/notion';
import SearchLayout from 'layouts/search';
import { Post, TagObj } from 'types';

export default function search({
  tags,
  posts,
  currentTag,
}: {
  tags: TagObj;
  posts: Post[];
  currentTag: number;
}) {
  return <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />;
}
export async function getStaticProps() {
  const posts = await getAllPosts({ includedPages: false });
  const tags = getAllTags(posts);
  return {
    props: {
      tags,
      posts,
    },
    revalidate: 1,
  };
}
