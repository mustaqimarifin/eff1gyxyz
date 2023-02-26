/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { FC, useEffect, useRef, useState } from "react";
import { Loading, Button, Typography, IconAlertCircle } from "@supabase/ui";
import clsx from "clsx";

import Editor, { EditorRefHandle } from "./Editor";
import Comment from "./Comment";
import { useReplyManager } from "./ReplyManagerProvider";
import { useCommentsContext } from "./CommentsProvider";
import User from "./User";
import {
  useUncontrolledState,
  useComments,
  useAddComment,
  useReactions,
  useUser,
} from "hooks";
import useAuthUtils from "hooks/useAuthUtils";
import { usePenis } from "hooks/utils";
import { Google } from "./SignIn";

export interface CommentsProps {
  topic: string;
  parentId?: string | null;
}

const Comments: FC<CommentsProps> = ({ topic, parentId = null }) => {
  const editorRef = useRef<EditorRefHandle | null>(null);
  const context = useCommentsContext();
  const [layoutReady, setLayoutReady] = useState(false);
  const replyManager = useReplyManager();
  const commentState = useUncontrolledState({ defaultValue: "" });
  const { auth, isAuthenticated, runIfAuthenticated } = useAuthUtils();
  const isomorphicEffect = usePenis();

  const queries = {
    comments: useComments({ topic, parentId }),
    user: useUser({ id: auth.user?.id! }, { enabled: !!auth.user?.id }),
  };

  const mutations = {
    addComment: useAddComment(),
  };

  // preload reactions
  useReactions();

  useEffect(() => {
    if (replyManager?.replyingTo) {
      commentState.setDefaultValue(
        `<span data-type="mention" data-id="${replyManager?.replyingTo.user_id}" data-label="${replyManager?.replyingTo.user.name}" contenteditable="false"></span><span>&nbsp</span>`
      );
    } else {
      commentState.setDefaultValue("");
    }
  }, [replyManager?.replyingTo]);

  isomorphicEffect(() => {
    if (mutations.addComment.isSuccess) {
      replyManager?.setReplyingTo(null);
      commentState.setDefaultValue("");
    }
  }, [mutations.addComment.isSuccess]);

  useEffect(() => {
    if (queries.comments.isSuccess) {
      // this is neccessary because tiptap on first render has different height than on second render
      // which causes layout shift. this just hides content on the first render to avoid ugly layout
      // shift that happens when comment height changes.
      setLayoutReady(true);
    }
  }, [queries.comments.isSuccess]);

  const user = queries.user.data;
  const Submit = () => {
    return (
      <button
        onClick={() => {
          runIfAuthenticated(() => {
            mutations.addComment.mutateAsync({
              topic,
              parentId,
              comment: commentState.value,
            });
          });
        }}
        className="py-1 px-2 rounded bg-indigo-500 font-semibold text-sm text-white disabled:opacity-40 hover:bg-indigo-700"
        disabled={!isAuthenticated}
      >
        Submit
      </button>
    );
  };

  return (
    <div className={clsx(context.mode, "sce-comments relative")}>
      {queries.comments.isLoading && (
        <div className="grid p-4 place-items-center">
          <div className="mr-4">
            <Loading active>{null}</Loading>
          </div>
        </div>
      )}
      {queries.comments.isError && (
        <div className="grid p-4 place-items-center">
          <div className="flex flex-col items-center space-y-0.5 text-center">
            <Typography.Text>
              <IconAlertCircle />
            </Typography.Text>
            <Typography.Text>Unable to load comments.</Typography.Text>
          </div>
        </div>
      )}
      {queries.comments.data && (
        <div
          className={clsx(
            "relative space-y-1 rounded-md",
            !layoutReady ? "invisible" : "visible"
          )}
        >
          <div className="space-y-1">
            {queries.comments.data.map((comment) => (
              <Comment key={comment.id} id={comment.id} />
            ))}
          </div>
          <div className="flex space-x-2">
            <div className="min-w-fit">
              <User id={user?.id} showAvatar showName={false} />
            </div>
            <div className="flex-1">
              <Editor
                ref={editorRef}
                key={commentState.key}
                defaultValue={commentState.defaultValue}
                onChange={(val) => {
                  commentState.setValue(val);
                }}
                autofocus={!!replyManager?.replyingTo}
                actions={!isAuthenticated ? Google : Submit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
