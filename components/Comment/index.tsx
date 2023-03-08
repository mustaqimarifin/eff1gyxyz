import { useState } from "react";
import { CommentForm } from "components/CommentForm";
import { CommentList } from "components/CommentList";
import { Comment as IComment } from "types";
import { trpc } from "utils/trpc";
import {
  HeartIcon,
  PencilAltIcon,
  ReplyIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { usePost } from "hooks/usePost";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IconButton } from "../IconButton";
import Avatar from "./Avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime, {
  rounding: Math.floor,
});
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());
const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

interface CommentProps {
  comment: IComment;
}

export const Comment = ({ comment }: CommentProps) => {
  const { id, text, user, createdAt, likeCount, likedByMe } = comment;

  const router = useRouter();
  const slug = router.query.slug as string;
  const { data: session } = useSession();

  const { getReplies } = usePost(slug);

  const { invalidateQueries } = trpc.useContext();
  const createComment = trpc.useMutation(["protectedPost.addComment"], {
    async onSuccess() {
      //@ts-ignore
      await invalidateQueries([
        "post.getBySlug",
        {
          slug: slug,
        },
      ]);
    },
  });

  const updateComment = trpc.useMutation(["protectedPost.updateComment"], {
    async onSuccess() {
      //@ts-ignore
      await invalidateQueries([
        "post.getBySlug",
        {
          slug: slug,
        },
      ]);
    },
  });

  const deleteComment = trpc.useMutation(["protectedPost.deleteComment"], {
    async onSuccess() {
      // Refetches posts after a comment is added
      //@ts-ignore
      await invalidateQueries([
        "post.getBySlug",
        {
          slug: slug,
        },
      ]);
    },
  });

  const toggleCommentLike = trpc.useMutation(["protectedPost.toggleLike"], {
    async onSuccess() {
      // Refetches posts after a comment is added
      //@ts-ignore
      await invalidateQueries([
        "post.getBySlug",
        {
          slug: slug,
        },
      ]);
    },
  });

  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);

  const replies: IComment[] = getReplies(id);

  const handleReply = async (text: string) => {
    return await createComment
      //@ts-ignore
      .mutateAsync({
        text,
        parentId: id,
        slug,
      })
      .then(() => {
        setIsReplying(false);
      });
  };

  const handleCommentEdit = async (text: string) => {
    return await updateComment
      //@ts-ignore
      .mutateAsync({
        commentId: id,
        text,
        slug,
      })
      .then(() => {
        setIsEditing(false);
      });
  };

  const handleCommentDelete = async () => {
    //@ts-ignore
    return await deleteComment.mutateAsync({
      commentId: id,
      slug,
    });
  };

  const handleToggleCommentLike = async () => {
    if (!session) return;
    //@ts-ignore
    return await toggleCommentLike.mutateAsync({
      commentId: id,
      slug,
    });
  };

  return (
    <>
      <div
        key={id}
        className=" tweet my-4 flex w-full transform flex-col rounded-lg border border-gray-200 bg-white px-6 py-4 transition duration-500 ease-in-out dark:border-gray-800 dark:bg-gray-900 "
      >
        <div className="mb-1 flex text-xs justify-between items-center px-2">
          <div className="inline-flex items-center mr-3 pr-4 text-gray-900 dark:text-white">
            <Avatar src={user.image} isLoading={false} className="mr-3" />
            <div>{user.name}</div>
          </div>
          <div className="justify-end">{dateFormatter.format(createdAt)}</div>
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus
            submitLabel="Update"
            initialValue={text}
            onSubmit={handleCommentEdit}
          />
        ) : (
          <div className="text">{text}</div>
        )}
        <div className="mt-2 flex gap-2">
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
          {user.id === session?.user?.id && (
            <>
              <IconButton
                onClick={() => setIsEditing((prev) => !prev)}
                Icon={PencilAltIcon}
                aria-label="Edit"
                isActive={isEditing}
                color="text-purple-700"
              />
              <IconButton
                onClick={handleCommentDelete}
                Icon={TrashIcon}
                aria-label="Delete"
                color="text-red-700"
                hoverbg="hover:bg-red-50"
              />
            </>
          )}
        </div>
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm autoFocus submitLabel="Reply" onSubmit={handleReply} />
        </div>
      )}
      {replies?.length > 0 && (
        <>
          <div className={clsx("flex", areChildrenHidden && "hidden")}>
            <button
              className="relative mt-2 w-[15px] -translate-x-1/2 cursor-pointer border-none bg-none p-0 outline-none before:absolute before:top-0 before:bottom-0 before:left-1/2 before:w-px before:bg-purple-200 before:transition-all before:duration-200 before:ease-in-out before:content-[''] hover:before:bg-purple-400 focus-visible:before:bg-purple-400"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="grow">
              <div className="grow pl-4">
                <CommentList comments={replies} />
              </div>
            </div>
          </div>
          <button
            className={clsx(
              "relative mt-2 rounded bg-purple-600 py-2 px-4 text-sm text-white ease-in-out hover:bg-purple-400 hover:transition-colors hover:duration-100",
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
