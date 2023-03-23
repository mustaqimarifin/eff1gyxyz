import Link from "next/link";
import BLOG from "blog.config.mjs";
type Props = {
  page: number;
  showNext: boolean;
};
export const Pagination: React.FC<Props> = ({ page, showNext }) => {
  const currentPage = +page;
  let additionalClassName = "justify-between";
  if (currentPage === 1 && showNext) additionalClassName = "justify-end";
  if (currentPage !== 1 && !showNext) additionalClassName = "justify-start";
  return (
    <div
      className={`flex font-medium text-black dark:text-gray-100 ${additionalClassName}`}
    >
      {currentPage !== 1 && (
        <Link
          rel="prev"
          className="block cursor-pointer"
          href={
            currentPage - 1 === 1
              ? `${BLOG.path || "/posts"}`
              : `/page/${currentPage - 1}`
          }
        >
          ← PREV
        </Link>
      )}
      {showNext && (
        <Link
          href={`/page/${currentPage + 1}`}
          rel="next"
          className="block cursor-pointer"
        >
          NEXT →
        </Link>
      )}
    </div>
  );
};

export default Pagination;
