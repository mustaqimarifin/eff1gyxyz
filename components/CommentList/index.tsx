import type { Komment } from "types";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Comment } from "../Comment";
interface CommentListProps {
  comments: Komment[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div ref={parent}>
      {comments?.map((comment: Komment) => (
        <div key={comment.id} className="my-2 last:mb-0">
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
};
