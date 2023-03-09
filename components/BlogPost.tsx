import Link from "next/link";
import BLOG from "blog.config";
import formatDate from "lib/formatDate";
import { Views } from "./ViewCounter";
import { yespls } from "lib/utils";
import useSWR from "swr";
import { Post } from "types";

const BlogPost = ({ post }: { post: Post }) => {
  const { data } = useSWR<Views>(`/api/views/${post.slug}`, yespls);
  const views = data?.total;
  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <article key={post.id} className="mb-6 md:mb-8">
        <header className="flex flex-col justify-between md:flex-row md:items-baseline">
          <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
            {post.title}
          </h2>
          <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            {formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}
          </time>
          <p className="w-32 mb-4 text-left text-gray-500 md:text-right md:mb-0">
            {`${views ? new Number(views).toLocaleString() : "–––"} views`}
          </p>
        </header>
        <main>
          <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
            {post.summary}
          </p>
        </main>
      </article>
    </Link>
  );
};

export default BlogPost;
