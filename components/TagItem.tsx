import Link from "next/link";

const TagItem = (tag: any) => (
  <Link
    href={`/tag/${encodeURIComponent(tag)}`}
    className="mr-1 rounded-full border px-2 py-1 text-sm leading-none dark:border-gray-600"
  >
    {tag}
  </Link>
);

export default TagItem;
