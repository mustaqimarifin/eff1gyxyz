import SearchLayout from 'layouts/search'
import { getAllPosts, getAllTags } from 'lib/notion'

export default function search({ tags, posts }) {
  return <SearchLayout tags={tags} posts={posts} currentTag={undefined} />
}
export async function getStaticProps() {
  const posts = await getAllPosts({ includedPages: false })
  const tags = getAllTags(posts)
  return {
    props: {
      tags,
      posts,
    },
    revalidate: 1,
  }
}
