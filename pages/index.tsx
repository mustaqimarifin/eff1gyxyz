// import Image from 'next/image';
import Link from 'next/link';

import Container from '../components/Container';
export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-5xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-center">
          <div>
            <div className="prose text-primary">

              <p>
                Hey, I&apos;m Mus. I&apos;m a{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://designdetails.fm">
                  music producer
                </a>
                ,{' '}
                <Link href="/writing" passHref>
                  audio engineer
                </Link>
                , and{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/brianlovin">
                  sorta terrible at code :D
                </a>
                . I&apos;m currently the marketing manager & creative lead at{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/mobile">
                  musegroupasia
                </a>
                .
              </p>
              <p>
                Before musegroupasia, I co-founded{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://spectrum.chat">
                  Akhyla
                </a>
                , a platform to electronic musicians to learn, collaborate and
                make records.
              </p>
              <p>
                During those years I was also Music Director at Infinity Games
                where I worked alongside some amazing talent helping shape the
                sound and music of{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://buffer.com">
                  Heroes of War
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
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
          className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
          Read all posts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 ml-1">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
            />
          </svg>
        </Link>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-16 text-black dark:text-white">
          Learn WTV
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Build and deploy a modern SaaS application using the most popular
          open-source software. This course is 12 hours long and is completely
          live streamed.
        </p>

        <span className="h-16" />
      </div>
    </Container>
  );
}
