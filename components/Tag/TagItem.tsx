import clsx from "clsx";
import { Twemoji } from "components/Twemoji";
import { TagSlug, getTagDataBySlug } from "lib/tags";
import Link from "next/link";

type Props = {
  tag: string;
};

export const TagItem: React.FC<Props> = ({ tag }) => {
  const castKey = tag as TagSlug;
  const tagData = getTagDataBySlug(castKey);
  return (
    <Link href={`/tag/${encodeURIComponent(tag)}`}>
      <a>
        <div className="flex items-center py-1 px-2 mr-1 text-sm leading-none rounded-full border dark:border-gray-600">
          {tagData?.emoji && <Twemoji emoji={tagData.emoji} size={16} />}
          <p
            className={clsx({
              "ml-1": !!tagData?.emoji,
            })}
          >
            {tagData?.name ?? tag}
          </p>
        </div>
      </a>
    </Link>
  );
};
