import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Avatar from "components/comments/Avatar";

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

type CommentListProps = {
  comments: Komment[];
  onDelete?: (comment: Komment) => Promise<void>;
};

export const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const minTime = () => timeout(220);

/* const redirect = () =>
  (window.location.href =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname) */

/* export async function deletePost({ id }: Comment2): Promise<void> {
  await fetch(`http://localhost:3000/api/comments/${id}`, {
    method: 'DELETE'
  });
  await Router.push(redirect());
}
 */
function CommentList({ comments, onDelete }: CommentListProps) {
  //const [parent] = useAutoAnimate<HTMLDivElement>();

  const [hover, setHover] = useState("X");
  const { data: session } = useSession();

  return (
    <div className=" mt-10 w-full space-y-6 ">
      {comments.map((comment) => {
        const isAuthor = session && session?.user?.id === comment.userId;
        const isAdmin = session && session.isAdmin;

        return (
          <div key={comment.id} className="flex space-x-4">
            <div className="flex-shrink-0 align-top">
              <Avatar comment={comment} />
            </div>

            <div className="flex-grow">
              <div className="flex content-center space-x-2 text-xs">
                <b>{comment.name}</b>
                <span
                  className=" font-semibold ml-auto text-pink-400 dark:text-pink-100 justify-self-auto "
                  suppressHydrationWarning
                >
                  {dayjs().diff(comment.createdAt, "seconds", true) < 60
                    ? "just now"
                    : dayjs(comment.createdAt).format("h:mm a - MMM d, YYYY")}
                </span>
                {(isAuthor || isAdmin) && (
                  <button
                    className="text-gray-400 hover:text-rose-400"
                    onMouseEnter={() => setHover("Delete")}
                    onMouseOut={() => setHover("X")}
                    onClick={async () => await onDelete(comment)}
                    aria-label="Close"
                  >
                    {hover}
                  </button>
                )}
              </div>

              <div className="prose text-sm leading-relaxed dark:prose-invert ">
                {comment.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentList;

/* <div key={comment.id} className="flex space-x-4">
            <div className="flex-shrink-0 align-top">
              <Image
                src={comment.image}
                alt={comment.name}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full"
              />
            </div>

            <div className="flex-grow">
              <div className="flex content-center space-x-2 text-sm">
                <b>{comment.name}</b>
                <span className="text-neutral-500 ">
                  {format(createdAt, 'h:mm a - MMM d, y')}
                </span>
                {(isAuthor || isAdmin) && (
                  <button
                    className="text-gray-400 hover:text-rose-400"
                    onMouseEnter={() => setHover('Delete')}
                    onMouseOut={() => setHover('X')}
                    onClick={async () => await onDelete(comment)}
                    aria-label="Close">
                    {hover}
                  </button>
                )}
              </div>

              <div className="prose font-mono text-sm leading-relaxed dark:prose-invert ">
                {comment.text}
              </div>
            </div>
          </div> */
