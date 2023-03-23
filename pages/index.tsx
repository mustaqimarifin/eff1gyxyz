// import Image from 'next/image';
import Link from "next/link";

import Container from "../components/Container";
export default function Home() {
  return (
    <Container>
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-center border-gray-200 pb-16 dark:border-gray-700">
        <div className="flex flex-col-reverse items-center sm:flex-row">
          <div>
            <div className="text-primary prose">
              <p>
                Hey, I&apos;m Mus. I&apos;m a{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://designdetails.fm"
                >
                  music producer
                </a>
                ,{" "}
                <Link href="/writing" passHref>
                  audio engineer
                </Link>
                , and{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/brianlovin"
                >
                  sorta terrible at code :D
                </a>
                . I&apos;m currently the marketing manager & creative lead at{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/mobile"
                >
                  musegroupasia
                </a>
                .
              </p>
              <p>
                Before musegroupasia, I co-founded{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://spectrum.chat"
                >
                  Akhyla
                </a>
                , a platform to electronic musicians to learn, collaborate and
                make records.
              </p>
              <p>
                During those years I was also Music Director at Infinity Games
                where I worked alongside some amazing talent helping shape the
                sound and music of{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://buffer.com"
                >
                  Heroes of War
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
          Featured Posts
        </h3>

        {/*         <div className="flex gap-6 flex-col md:flex-row">
          <BlogPostCard
            title="Everything I Know About Style Guides, Design Systems, and Component Libraries"
            slug="how-stripe-designs-beautiful-websites"
            gradient="from-[#D8B4FE] to-[#818CF8]"
          />
          <BlogPostCard
            title="Past, Present, and Future of React State Management"
            slug="stop-wasting-your-time"
            gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
          />
          <BlogPostCard
            title="Which Back End Should I Use As A Front-End Developer?"
            slug="spotify-api-nextjs"
            gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
          />
        </div> */}
        <Link
          href="/posts"
          className="mt-8 flex h-6 rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Read all posts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="ml-1 h-6 w-6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
            />
          </svg>
        </Link>
        <h3 className="mb-4 mt-16 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
          Learn WTV
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Build and deploy a modern SaaS application using the most popular
          open-source software. This course is 12 hours long and is completely
          live streamed.
        </p>

        <span className="h-16" />
      </div>
    </Container>
  );
}
