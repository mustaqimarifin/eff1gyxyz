import { type TagObj } from "types";
import { TagTabItem } from "./TagTabItem";

type Props = {
  tags: TagObj;
  currentTag?: string;
  postType?: "project" | "post";
};

export const Tags: React.FC<Props> = ({
  tags,
  currentTag,
  postType = "post",
}: Props) => {
  if (!tags) return null;
  return (
    <div className="tag-container flex items-center">
      <ul className="flex max-w-full overflow-x-auto py-2">
        <TagTabItem
          tagKey="all"
          selected={!currentTag}
          root
          postType={postType}
        />
        {Object.keys(tags).map((key) => {
          return (
            <TagTabItem
              key={key}
              tagKey={key}
              selected={key === currentTag}
              count={tags[key]}
              postType={postType}
            />
          );
        })}
      </ul>
    </div>
  );
};
