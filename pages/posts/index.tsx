import BLOG from 'blog.config'
import BlogPost from 'components/BlogPost'
import Container from 'components/Container'
import Pagination from 'components/Pagination'
import { getAllPosts } from 'lib/notion'
import { type Post } from 'types'

export async function getStaticProps() {
  const posts: Post[] = await getAllPosts({ includedPages: false })
  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
    },
    revalidate: 30,
  }
}

const blog = ({ postsToShow, page, showNext }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      {postsToShow.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default blog
