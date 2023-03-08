import Image from "next/image";
import Container from "components/Container";
import TagItem from "components/TagItem";
import { MapImageUrlFn, NotionRenderer } from "react-notion-x";
import BLOG from "blog.config";
import formatDate from "lib/formatDate";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Decoration, ExtendedRecordMap } from "notion-types";
import { Post } from "types";
import React, { Suspense } from "react";
import clsx from "clsx";
import ViewCounter from "components/ViewCounter";
import CommentComponent from "components/CommentComponent";

const enableCommentArea = BLOG.comment.provider !== "";

export function textDecorationsToString(decorations: Decoration[]): string {
  return decorations.map((decoration) => decoration[0]).join("");
}

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "");
};
const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    // add / remove any prism syntaxes here
    await Promise.all([
      import("prismjs/components/prism-markup-templating.js"),
      import("prismjs/components/prism-markup.js"),
      import("prismjs/components/prism-bash.js"),
      import("prismjs/components/prism-git.js"),
      import("prismjs/components/prism-go.js"),
      import("prismjs/components/prism-graphql.js"),
      import("prismjs/components/prism-markdown.js"),
      import("prismjs/components/prism-rust.js"),
      import("prismjs/components/prism-sql.js"),
    ]);
    return m.Code;
  })
);
/* const CodeBlock = dynamic(() =>
  import('components/CodeBlock').then(async (m) => m.CodeBlock)
); */
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

type Props = {
  rootPageId?: string;
  rootDomain?: string;
  blockMap: ExtendedRecordMap;
  post: Post;
  emailHash?: string;
  fullWidth?: boolean;
  previewImagesEnabled?: boolean;
  mapImageUrl?: MapImageUrlFn | null;
  //onlyContents?: boolean,
  //tweet?: typeof Tweet,
  slug: string;
};

const Layout: React.FC<Props> = ({
  slug,
  blockMap,
  rootPageId,
  rootDomain,
  post,
  emailHash,
  fullWidth = false,
  previewImagesEnabled,
}) => {
  const router = useRouter();
  //const slug = useRouter().query.slug as string;

  const components = React.useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
      Code,
      /*  Code: ({ block }: { block: Block }) => {
        return (
          <CodeBlock
            language={textDecorationsToString(
              block.properties.language
            ).toLowerCase()}
            text={textDecorationsToString(block.properties.title)}
          />
        );
      }, */
      Collection,
      Pdf,
      Modal,
    }),
    []
  );

  return (
    <Container
      layout="blog"
      title={post.title}
      description={post.summary}
      // date={new Date(post.publishedAt).toISOString()}
      type="article"
      fullWidth={fullWidth}
    >
      <article>
        <h1 className="font-bold text-3xl text-black dark:text-white">
          {post.title}
        </h1>
        {post?.type[0] !== "Page" && (
          <nav className="flex mt-7 items-start text-gray-500 dark:text-gray-400">
            <div className="flex mb-4">
              <a href={BLOG.socialLink || "#"} className="flex">
                <Image
                  alt={BLOG.author}
                  width={24}
                  height={24}
                  src={`https://gravatar.com/avatar/${emailHash}`}
                  className="rounded-full"
                />
                <p className="ml-2 md:block">{BLOG.author}</p>
              </a>
              <span className="block">&nbsp;/&nbsp;</span>
            </div>
            <div className="mr-2 mb-4 md:ml-0">
              {formatDate(post.date.start_date || post.createdTime, BLOG.lang)}
              ||
              <ViewCounter slug={post.slug} />
            </div>
            {post.tags && (
              <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">
                {post?.tags.map((tag) => (
                  <TagItem key={tag} tag={tag} />
                ))}
              </div>
            )}
          </nav>
        )}

        {blockMap && (
          <div className="-mt-4">
            <NotionRenderer
              recordMap={blockMap}
              rootDomain={rootDomain}
              rootPageId={rootPageId}
              previewImages={previewImagesEnabled}
              components={components}
              mapPageUrl={mapPageUrl}
            />
          </div>
        )}
      </article>
      <div
        className={clsx(
          "flex justify-between font-medium text-gray-500 dark:text-gray-400",
          {
            "mb-4": enableCommentArea,
          }
        )}
      >
        <button
          onClick={() => router.push(BLOG.path || "/")}
          className="mt-2 hover:text-black dark:hover:text-gray-100 cursor-pointer"
        >
          ← BACK
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-2 hover:text-black dark:hover:text-gray-100 cursor-pointer"
        >
          ↑ TOP
        </button>
      </div>
      <CommentComponent slug={slug} />

      {/*       <CommentsContextProvider commentId={commentId}>
        <Comments slug={post.slug} />
      </CommentsContextProvider> */}
    </Container>
  );
};

export default Layout;
