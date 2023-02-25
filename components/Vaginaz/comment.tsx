/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Avatar from "components/comments/Avatar";
import cn from "clsx";

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
import type { Komment } from "types";
import { CommentForm } from "./form";
import Plus from "lib/utils/icons/Plus";
import useComments from "./hooks/useComment";
import type { Comment } from "prisma/generated/zod";
import { useMutation } from "react-query";

const MAX_LINES = 10;
const LINE_HEIGHT = 24; // in px
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT;

interface ReplyFormProps {
  parentId?: string | null;
  comment?: Komment;
  handleResetCallback: () => void;
  placeholder?: string;
  handleSubmit?: any;
  submitLabel?: string;
}
const ReplyForm = ({
  placeholder,
  handleSubmit,
  submitLabel,
  comment,
  parentId,
  handleResetCallback,
}: ReplyFormProps): JSX.Element => {
  const [hidden, setHidden] = useState(false);
  return (
    <div
      className={cn(
        "my-1 transition duration-1000 ease-in-out transform -translate-x-1 -mr-1",
        {
          hidden,
        }
      )}
    >
      <CommentForm
        parentId={comment?.id}
        autofocus={true}
        handleResetCallback={handleResetCallback}
        submitLabel={submitLabel}
        placeholder={placeholder}
        handleSubmit={handleSubmit}
        hideEarlyCallback={() => setHidden(true)}
      />
    </div>
  );
};

interface Props {
  comment: Komment;
  //onDelete: (comment: Komment) => Promise<void>;
  pageIndex?: number;
  highlight?: boolean;
  parent?: Komment;
  replies?: Komment[] | null;
  addComment: any;
  parentId?: Komment;
  userId: Comment["userId"];
}

const Comment = ({
  parent,
  comment,
  addComment,
  replies,
  parentId,
  pageIndex,
  highlight = false,
}: Props): JSX.Element => {
  const { onSubmit, onDelete, onReply } = useComments();

  const { data: session } = useSession();
  const isAuthor = session && session?.user?.id === comment.userId;
  const isAdmin = session && session.isAdmin;
  //const canDelete = userId === comment?.userId && replies?.length === 0;
  //const canReply = Boolean(userId);
  const replyId = parentId ? parentId : comment?.id;
  const [hidden, setHidden] = useState(false);
  const [isOverflowExpanded, setIsOverflowExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  /*   const createComment = useMutation(addTodo);

  try {
    const todo = await createComment.mutateAsync(todo);
    console.log(todo);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('done');
  }
 */
  useEffect(() => {
    if (textRef && textRef.current) {
      const el = textRef.current;
      if (el.scrollHeight > MAX_HEIGHT) {
        setIsOverflow(true);
      }
    }
  }, []);

  async function handlePin() {
    return;
  }
  return (
    <div key={comment.id}>
      <div className=" tweet rounded-lg border border-gray-200 dark:border-gray-800 px-6 py-4 my-4 w-full bg-white dark:bg-gray-900 flex flex-col transition duration-500 ease-in-out transform ">
        <div
          className={cn("grid gap-x-3 comment-grid", {
            "gap-y-2": !hidden,
          })}
        >
          {highlight && (
            <>
              <div className="row-start-1 col-start-1 row-end-3 col-end-3 -m-1 opacity-5 bg-indigo-700 dark:bg-indigo-50 dark:border-gray-100 rounded pointer-events-none" />
            </>
          )}
          {!hidden ? (
            <>
              <div className="grid row-start-1 col-start-1 place-items-center overflow-hidden">
                <Avatar comment={comment} isDeleted={comment.isDeleted} />
              </div>
              <div className="row-start-2 row-end-5 col-start-1 col-end-2 row-span-auto flex justify-center my-1 px-1">
                <button
                  className={cn(
                    "flex-grow flex justify-center border-none group focus-ring mb-1",
                    hidden
                  )}
                  onClick={() => setHidden(true)}
                  aria-label={`Collapse comment by ${comment.user}`}
                >
                  <div
                    className={cn("w-px h-full", {
                      "bg-gray-200 group-hover:bg-gray-500 group-active:bg-gray-500 dark:bg-gray-600 dark:group-hover:bg-gray-400 dark:group-active:bg-gray-400":
                        !highlight,
                      "bg-gray-300 group-hover:bg-gray-600 group-active:bg-gray-600 dark:bg-gray-600 dark:group-hover:bg-gray-400 dark:group-active:bg-gray-400":
                        highlight,
                    })}
                  />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setHidden(false)}
              className={
                "row-start-1 col-start-1 grid place-items-center focus-ring w-7 h-7"
              }
              aria-label={`Expand comment by ${comment.user}`}
            >
              <Plus className="w-4 h-4 text-gray-500" />
            </button>
          )}
          <div className="row-start-1 col-start-2 self-center justify-around">
            <div className="flex flex-grow justify-items-stretch">
              <span
                className={cn(
                  "text-zinc-600 dark:text-teal-200 font-semibold ",
                  {
                    "text-xs ": !hidden,
                    "text-xs": hidden,
                  }
                )}
              >
                {!comment.isDeleted ? comment.name : <>[Deleted]</>}{" "}
              </span>
              <span
                className=" font-semibold text-xs ml-auto text-pink-400 dark:text-pink-100 justify-self-auto "
                suppressHydrationWarning
              >
                {dayjs().diff(comment.createdAt, "seconds", true) < 60
                  ? "just now"
                  : dayjs(comment.createdAt).format("h:mm a - MMM d, YYYY")}
              </span>
              {isAdmin && (
                <button
                  className="text-xs flex flex-row items-center text-gray-600 dark:text-gray-400 focus-ring border-none ml-5 leading-none"
                  onClick={handlePin}
                  aria-label={`Pin comment by ${comment.user}`}
                >
                  Pin comment
                </button>
              )}
            </div>
          </div>

          <div className={cn("row-start-2 col-start-2", { hidden })}>
            <section
              className={cn(
                "text-gray-700 dark:text-gray-50 leading-6 text-sm font-light pb-2",
                {
                  "line-clamp-10": !isOverflowExpanded,
                  hidden,
                }
              )}
              ref={textRef}
            >
              <div className="w-full text-zinc-600 leading-loose dark:text-gray-100 tracking-wide">
                {comment.text}
              </div>
            </section>

            {isOverflow && (
              <button
                className="text-sm text-indigo-700 dark:text-indigo-400 hover:underline focus:underline focus-ring border border-transparent leading-none"
                onClick={() => setIsOverflowExpanded(!isOverflowExpanded)}
                aria-label={`Pin comment by ${comment.name}`}
              >
                {isOverflowExpanded ? (
                  <span>Show less</span>
                ) : (
                  <span>Read more</span>
                )}
              </button>
            )}

            <div className="grid grid-flow-col justify-start auto-cols-min gap-x-3 transform">
              <span
                className="text-xs flex items-center text-gray-600 dark:text-gray-100 border-none"
                onClick={() => setShowReplyForm(!showReplyForm)}
                aria-label={
                  showReplyForm
                    ? `Hide reply form`
                    : `Reply to comment by ${comment.user}`
                }
              >
                {showReplyForm ? (
                  <button className="text-gray-500 dark:text-gray-200 hover:text-red-300">
                    Cancel&nbsp;&nbsp;
                  </button>
                ) : (
                  <button className="text-gray-500 dark:text-gray-200 hover:text-indigo-300">
                    Reply&nbsp;&nbsp;
                  </button>
                )}

                {(isAuthor || isAdmin) && (
                  <button
                    className="text-xs flex flex-row items-center text-gray-500 dark:text-gray-200 hover:text-yellow-300 border-none"
                    onClick={async () => await onDelete(comment)}
                    aria-label={`Delete comment by ${comment.name}`}
                  >
                    &nbsp;Delete
                  </button>
                )}
              </span>
            </div>
          </div>

          <div
            className={cn(
              "row-start-3 row-span-2 rounded-md transform -translate-x-2 -mr-2",
              {
                hidden,
              }
            )}
          >
            {showReplyForm && (
              <div className="divide-pink-200 ">
                <ReplyForm
                  comment={comment}
                  submitLabel="Reply"
                  placeholder={`Reply to comment by ${comment.name}`}
                  handleSubmit={(text: Komment) => addComment(text, replyId)}
                  handleResetCallback={() => setShowReplyForm(false)}
                />
              </div>
            )}
            <div className={cn("rounded-md ")}>
              {replies && replies?.length > 0 && (
                <div className={cn("rounded-md ")}>
                  {replies?.map((reply) => (
                    <Comment
                      comment={reply}
                      key={reply.id}
                      addComment={addComment}
                      replies={[]}
                      pageIndex={pageIndex}
                      highlight={comment.highlight}
                      userId={reply.userId}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Comment;
