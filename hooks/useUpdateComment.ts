import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";

interface UseUpdateCommentPayload {
  id: string;
  comment: string;
}

const useUpdateComment = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, comment }: UseUpdateCommentPayload) => {
      return api.updateComment(id, {
        comment,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["comments", data.id]);
      },
    }
  );
};

export default useUpdateComment;
