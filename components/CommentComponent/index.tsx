import { useState } from "react";
import { CommentForm } from "components/CommentForm";
import { CommentList } from "components/CommentList";

import { usePost } from "hooks/usePost";
import { api } from "utils/api";

const CommentComponent = ({ slug }: { slug: string }) => {
  const [error, setError] = useState("");
  const { rootComments } = usePost( slug );

  const utils = api.useContext();
  const createComment = api.post.addComment.useMutation({
    async onSuccess(input) {
      await utils.post.getBySlug.invalidate({ slug: input.slug as string });
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
    return await createComment.mutateAsync({ slug, text }).then(() => {
      setError("");
    });
  };

  return (
    <>
      <h2 className="p-4 text-center text-xl font-bold text-gray-800">
        Comments
      </h2>

      <CommentForm onSubmit={handleCommentCreate} error={error} />
      <CommentList comments={rootComments} />
    </>
  );
};

export default CommentComponent;
