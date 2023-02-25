import { useState } from "react";

import { Komment } from "types";
import {
  HeartIcon,
  PencilAltIcon,
  ReplyIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IconButton } from "../IconButton";
import useComments from "./hooks/useComment";
import { CommentForm } from "./form";
import CommentList from "./list";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

interface CommentProps {
  comment: Komment;
}

export const Comment = ({ comment }: CommentProps) => {
  const { id, user, createdAt, likeCount, likedByMe } = comment;

  const router = useRouter();
  const slug = router.query.slug as string;
  const { data: session } = useSession();

  const { text, getReplies, onDelete } = useComments();
  const isAuthor = session && session?.user?.id === comment.userId;
  const isAdmin = session && session.isAdmin;

  const queryClient = useQueryClient();
  const newComment = {
    text,
    parentId: id,
    slug,
  };

  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);

  const childComments = getReplies(id);

  const handleReply = async (text: string) => {
    return await createComment
      .mutateAsync({
        text,
        parentId: id,
        slug,
      })
      .then(() => {
        setIsReplying(false);
      });
  };

  /*   const handleCommentDelete = async ({ id }) => {
    return await onDelete({
      id: id,
    });
  };
 */

  return (
    <>
      <div
        key={id}
        className="p-3 md:p-4 border-2 border-purple-100 rounded-lg"
      >
        <div className="flex justify-between mb-1 text-sm">
          <span className="font-bold">{user.name}</span>
          <span>{dateFormatter.format(createdAt)}</span>
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus
            buttonText="Update"
            initialValue={text}
            onSubmit={(text) => updateComment(text, comment.id)}
            loading={false}
          />
        ) : (
          <div className="text">{text}</div>
        )}
        <div className="flex gap-2 mt-2">
          <IconButton
            onClick={handleToggleCommentLike}
            Icon={likedByMe ? HeartSolidIcon : HeartIcon}
            aria-label={likedByMe ? "Unlike" : "Like"}
            color="text-purple-700"
          >
            {likeCount}
          </IconButton>
          {session && (
            <IconButton
              onClick={() => setIsReplying((prev) => !prev)}
              Icon={ReplyIcon}
              aria-label="Reply"
              isActive={isReplying}
              color="text-purple-700"
            />
          )}
          {isAuthor ||
            (isAdmin && (
              <>
                <IconButton
                  onClick={() => setIsEditing((prev) => !prev)}
                  Icon={PencilAltIcon}
                  aria-label="Edit"
                  isActive={isEditing}
                  color="text-purple-700"
                />
                <IconButton
                  onClick={async () => await onDelete(comment)}
                  Icon={TrashIcon}
                  aria-label="Delete"
                  color="text-red-700"
                  hoverBg="hover:bg-red-50"
                />
              </>
            ))}
        </div>
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            autoFocus
            buttonText="Reply"
            onSubmit={handleReply}
            loading={false}
          />
        </div>
      )}
      {childComments?.length > 0 && (
        <>
          <div className={clsx("flex", areChildrenHidden && "hidden")}>
            <button
              className="border-none bg-none p-0 w-[15px] mt-2 relative cursor-pointer outline-none -translate-x-1/2 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-1/2 before:w-px before:bg-purple-200 before:transition-all before:ease-in-out before:duration-200 hover:before:bg-purple-400 focus-visible:before:bg-purple-400"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="grow">
              <div className="pl-4 grow">
                <CommentList comments={childComments} />
              </div>
            </div>
          </div>
          <button
            className={clsx(
              "relative mt-2 py-2 px-4 rounded text-sm text-white bg-purple-600 hover:bg-purple-400 hover:transition-colors hover:duration-100 ease-in-out",
              !areChildrenHidden && "hidden"
            )}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  );
};
