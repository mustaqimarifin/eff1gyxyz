import { useSession } from 'next-auth/react';
import Plus from 'lib/utils/icons/Plus';
import cn from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import VoteButtons from './VoteButtons';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime, {
  rounding: Math.floor,
});
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());
import { ComponentState, Dispatch, useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import { CommentForm, Comments } from './CommentForm';
import { CommentType } from 'types/interface';
import { Database } from 'types/arsetypes';
import { deleteComment } from './kopee';

type UserComments = Database['public']['Views']['comments_with_metadata']['Row'];
//type linearView= Database['public']['Views']['linearView']['Row'];

const MAX_LINES = 10;
const LINE_HEIGHT = 24; // in px
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT;

interface ReplyFormProps {
  comment: CommentType;
  handleResetCallback: () => void;
  placeholder?: string;
  handleSubmit: any;
  submitLabel?: string;
}
const ReplyForm = ({
  placeholder,
  handleSubmit,
  submitLabel,
  comment,
  handleResetCallback,
}: ReplyFormProps): JSX.Element => {
  const [hidden, setHidden] = useState(false);
  return (
    <div
      className={cn(
        'my-1 transition duration-1000 ease-in-out transform -translate-x-1 -mr-1',
        {
          hidden,
        }
      )}>
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
  comment: CommentType;
  pageIndex?: number;
  highlight?: boolean;
  parent?: CommentType;
  replies?: CommentType[] | null;
  setActiveComment: Dispatch<any>;
  activeComment: any;
  // use lower-case primitives for consistency
  //deleteComment:(a: string) => void
  addComment: () => void;
  parentId?: Comments['parent_id'];
  authorId: Comments['user_id'];
}

const Comment = ({
  parent,
  comment,
  replies,
  setActiveComment,
  activeComment,
  //deleteComment,
  addComment,
  parentId = null,
  pageIndex,
  highlight = false,
}: Props): JSX.Element => {
  /*   const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'replying'; */
  const { data: session } = useSession();
  const user = session?.user;
  const authorId = session?.userId;
  const commentId = comment.id ?? null;
  const canDelete = authorId === comment?.authorId && replies?.length === 0;
  const canReply = Boolean(authorId);
  const replyId = parentId ? parentId : comment.id;
  const [hidden, setHidden] = useState(false);
  const [isOverflowExpanded, setIsOverflowExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const isAdmin = false;

  useEffect(() => {
    if (textRef && textRef.current) {
      const el = textRef.current;
      if (el.scrollHeight > MAX_HEIGHT) {
        setIsOverflow(true);
      }
    }
  }, []);

  /*   async function handleApprove() {
    const { data } = await supabase
      .from('comments')
      .update({
        isApproved: true
      })
      .eq('id', comment.id);
    // mutateComments(comment.mutateKey);
  }
  async function handleDeny() {
    const { data } = await supabase
      .from('comments')
      .update({
        isPublished: false,
        isApproved: false
      })
      .eq('id', comment.id);
  } */

  async function handlePin() {
    return;
  }
  return (
    <div key={comment.id}>
      <div className=" tweet rounded-lg border border-gray-200 dark:border-gray-800 px-6 py-4 my-4 w-full bg-white dark:bg-gray-900 flex flex-col transition duration-500 ease-in-out transform ">
        {!hidden && parent && (
          <div className="grid gap-x-2 comment-grid">
            <div className="w-6 relative">
              <div className="col-start-1 border-pink-700 border-t-2 border-l-2 rounded-tl box-border absolute -right-1 bottom-0 w-2/3 h-1/2" />
            </div>
            <div className="col-start-2 flex items-center leading-none mb-1 transform translate-y-1">
              <button
                className="text-xs text-gray-500 hover:underline focus-ring active:underline cursor-pointer focus:outline-none"
                aria-label={`View comment by ${parent.name}`}>
                @{parent.name}:
              </button>
              <div className="text-xs text-gray-800 ml-1 hover:text-gray-400 focus-ring active:text-gray-400 cursor-pointer focus:outline-none line-clamp-1">
                {parent.text}
              </div>
            </div>
          </div>
        )}
        <div
          className={cn('grid gap-x-3 comment-grid', {
            'gap-y-2': !hidden,
          })}>
          {highlight && (
            <>
              <div className="row-start-1 col-start-1 row-end-3 col-end-3 -m-1 opacity-5 bg-indigo-700 dark:bg-indigo-50 dark:border-gray-100 rounded pointer-events-none" />
            </>
          )}
          {!hidden ? (
            <>
              <div className="grid row-start-1 col-start-1 place-items-center overflow-hidden">
                <Avatar user={user} isDeleted={comment.isDeleted} />
              </div>
              <div className="row-start-2 row-end-5 col-start-1 col-end-2 row-span-auto flex justify-center my-1 px-1">
                <button
                  className={cn(
                    'flex-grow flex justify-center border-none group focus-ring mb-1',
                    hidden
                  )}
                  onClick={() => setHidden(true)}
                  aria-label={`Collapse comment by ${comment.author}`}>
                  <div
                    className={cn('w-px h-full', {
                      'bg-gray-200 group-hover:bg-gray-500 group-active:bg-gray-500 dark:bg-gray-600 dark:group-hover:bg-gray-400 dark:group-active:bg-gray-400':
                        !highlight,
                      'bg-gray-300 group-hover:bg-gray-600 group-active:bg-gray-600 dark:bg-gray-600 dark:group-hover:bg-gray-400 dark:group-active:bg-gray-400':
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
                'row-start-1 col-start-1 grid place-items-center focus-ring w-7 h-7'
              }
              aria-label={`Expand comment by ${comment.author}`}>
              <Plus className="w-4 h-4 text-gray-500" />
            </button>
          )}
          <div className="row-start-1 col-start-2 self-center justify-around">
            <div className="flex flex-grow justify-items-stretch">
              <span
                className={cn(
                  'text-zinc-600 dark:text-teal-200 font-semibold ',
                  {
                    'text-xs ': !hidden,
                    'text-xs': hidden,
                  }
                )}>
                {!comment.isDeleted ? comment.name : <>[Deleted]</>}{' '}
              </span>
              <span
                className=" font-semibold text-xs ml-auto text-pink-400 dark:text-pink-100 justify-self-auto "
                suppressHydrationWarning>
                {dayjs().diff(comment.createdAt, 'seconds', true) < 30
                  ? 'just now'
                  : dayjs(comment.createdAt).fromNow()}
              </span>
              {isAdmin && (
                <button
                  className="text-xs flex flex-row items-center text-gray-600 dark:text-gray-400 focus-ring border-none ml-5 leading-none"
                  onClick={handlePin}
                  aria-label={`Pin comment by ${comment.author}`}>
                  Pin comment
                </button>
              )}
            </div>
          </div>

          <div className={cn('row-start-2 col-start-2', { hidden })}>
            <section
              className={cn(
                'text-gray-700 dark:text-gray-50 leading-6 text-sm font-light pb-2',
                {
                  'line-clamp-10': !isOverflowExpanded,
                  hidden,
                }
              )}
              ref={textRef}>
              <div className="w-full text-zinc-600 leading-loose dark:text-gray-100 tracking-wide">
                {comment.text}
              </div>
            </section>

            {isOverflow && (
              <button
                className="text-sm text-indigo-700 dark:text-indigo-400 hover:underline focus:underline focus-ring border border-transparent leading-none"
                onClick={() => setIsOverflowExpanded(!isOverflowExpanded)}
                aria-label={`Pin comment by ${comment.name}`}>
                {isOverflowExpanded ? (
                  <span>Show less</span>
                ) : (
                  <span>Read more</span>
                )}
              </button>
            )}

            {canReply && (
              <div className="grid grid-flow-col justify-start auto-cols-min gap-x-3 transform">
                <VoteButtons comment={comment} />

                <span
                  className="text-xs flex items-center text-gray-600 dark:text-gray-100 border-none"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  aria-label={
                    showReplyForm
                      ? `Hide reply form`
                      : `Reply to comment by ${comment.author}`
                  }>
                  {showReplyForm ? (
                    <button className="text-gray-500 dark:text-gray-200 hover:text-red-300">
                      Cancel&nbsp;&nbsp;
                    </button>
                  ) : (
                    <button className="text-gray-500 dark:text-gray-200 hover:text-indigo-300">
                      Reply&nbsp;&nbsp;
                    </button>
                  )}

                  {canDelete && (
                    <button
                      className="text-xs flex flex-row items-center text-gray-500 dark:text-gray-200 hover:text-yellow-300 border-none"
                      onClick={async () => await deleteComment({ commentId })}
                      aria-label={`Delete comment by ${comment.name}`}>
                      &nbsp;Delete
                    </button>
                  )}
                </span>
                {/*                 {isAdmin && (
                  <>
                    <button
                      className="text-xs text-red-600 flex flex-row items-center focus-ring border-none whitespace-nowrap"
                      onClick={handleBan}
                      aria-label={`Ban ${comment.name}`}
                    >
                      Ban user
                    </button>
                  </>
                )} */}
              </div>
            )}
          </div>

          <div
            className={cn(
              'row-start-3 row-span-2 rounded-md transform -translate-x-2 -mr-2',
              {
                hidden,
              }
            )}>
            {showReplyForm && (
              <div className="divide-pink-200 ">
                <ReplyForm
                  comment={comment}
                  submitLabel="Reply"
                  placeholder={`Reply to comment by ${comment.name}`}
                  handleSubmit={(text: string) => addComment()}
                  handleResetCallback={() => setShowReplyForm(false)}
                />
              </div>
            )}
            {replies && replies?.length > 0 && (
              <div className={cn('rounded-md ')}>
                {replies.map((reply) => (
                  <Comment
                    comment={reply}
                    key={reply.id}
                    setActiveComment={setActiveComment}
                    activeComment={activeComment}
                    addComment={addComment}
                    parentId={comment.id}
                    replies={[]}
                    pageIndex={pageIndex}
                    highlight={comment.highlight}
                    authorId={''}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Comment;
