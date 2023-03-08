import { useState } from "react";
import { CommentForm } from "components/CommentForm";
import { CommentList } from "components/CommentList";

import { trpc } from "utils/trpc";
import { usePost } from "hooks/usePost";

const CommentComponent = ({ slug }: { slug: string }) => {
  const [error, setError] = useState("");
  //@ts-ignore
  const { rootComments } = usePost(slug);

  const { invalidateQueries } = trpc.useContext();
  const createComment = trpc.useMutation(["protectedPost.addComment"], {
    async onSuccess() {
      // Refetches posts after a comment is added
      await invalidateQueries(["post.getBySlug"]);
    },
  });

  const handleCommentCreate = async (text: string) => {
    if (text.trim().length === 0) {
      setError("You need to specify a text!");
      return;
    }

    if (text.trim().length < 4) {
      setError("text is too short!");
      return;
    }
    //@ts-ignore
    return await createComment.mutateAsync({ slug: slug, text }).then(() => {
      setError("");
    });
  };

  return (
    <>
      <h2 className="text-xl font-bold text-center p-4 text-gray-800">
        Comments
      </h2>

      <CommentForm onSubmit={handleCommentCreate} error={error} />
      <CommentList comments={rootComments} />
    </>
  );
};

export default CommentComponent;
