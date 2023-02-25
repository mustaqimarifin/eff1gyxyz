import dynamic from "next/dynamic";
import BLOG from "blog.config";
import { Post } from "types";

const UtterancesComponent = dynamic(
  () => {
    return import("components/Komment/Utterances");
  },
  { ssr: false }
);

type Props = {
  post: Post;
};

export const Komments: React.FC<Props> = ({ post }) => {
  return (
    <div>
      {BLOG.comment && BLOG.comment.provider === "utterances" && (
        <UtterancesComponent issueTerm={post.id} />
      )}
    </div>
  );
};
