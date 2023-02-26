import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";

interface UseAddCommentPayload {
  comment: string;
  topic: string;
  parentId: string | null;
}

const useAddComment = () => {
  const queryClient = useQueryClient();
  const api = useApi();

  return useMutation(
    ({ comment, topic, parentId }: UseAddCommentPayload) => {
      return api.addComment({
        comment,
        topic,
        parent_id: parentId,
      });
    },
    {
      onSuccess: (data, params) => {
        queryClient.invalidateQueries([
          "comments",
          { topic: params.topic, parentId: params.parentId },
        ]);
      },
    }
  );
};

export default useAddComment;
