import Link from "next/link";
import BLOG from "blog.config";
import formatDate from "lib/formatDate";
import { type Views } from "./ViewCounter";
import { yespls } from "lib/utils";
import useSWR from "swr";
import { type Post } from "types";

const BlogPost = ({ post }: { post: Post }) => {
  const { data } = useSWR<Views>(`/api/views/${post.slug}`, yespls);
  const views = data?.total;
  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <article key={post.id} className="mb-6 md:mb-8">
        <header className="flex flex-col justify-between md:flex-row md:items-baseline">
          <h2 className="mb-2 cursor-pointer text-lg font-medium text-black dark:text-gray-100 md:text-xl">
            {post.title}
          </h2>
          <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            {formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}
          </time>
          <p className="mb-4 w-32 text-left text-gray-500 md:mb-0 md:text-right">
            {`${views ? new Number(views).toLocaleString() : "–––"} views`}
          </p>
        </header>
        <main>
          <p className="hidden leading-8 text-gray-700 dark:text-gray-300 md:block">
            {post.summary}
          </p>
        </main>
      </article>
    </Link>
  );
};

export default BlogPost;
