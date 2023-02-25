/* eslint-disable @typescript-eslint/ban-ts-comment */
import Avatar from "components/comments/Avatar";
import { autosize } from "lib/utils/index";
import cn from "clsx";
import User from "lib/utils/icons/User";

import { signIn, signOut, useSession } from "next-auth/react";
import useComments from "./hooks/useComment";
import { useEffect, useRef, useState } from "react";
import { Comment } from "prisma/generated/zod";
import { Komment } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
interface CommentFormProps {
  parentId?: Comment | null;
  autoFocus?: boolean;
  handleSubmit?: () => void;
  placeholder?: string;
  submitLabel?: string;
  autofocus?: boolean;
  handleResetCallback?: () => void;
  hideEarlyCallback?: () => void;
}
export const CommentForm = ({
  parentId = null,
  autoFocus = false,
  submitLabel = "Post",
  handleResetCallback,
  hideEarlyCallback,
}: CommentFormProps) => {
  //const { text, setText, onSubmit, onReply } = useComments();
  const { data: session } = useSession();
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [slug, setSlug] = useState<Komment["slug"]>();
  //const [parentId, setParentId] = useState();

  const { data: comments } = useQuery<Komment[]>({
    queryKey: ["comments"],
    queryFn: () => axios.get(`/api/posts/${slug}`).then((res) => res.data),
  });
  useEffect(() => {
    if (autoFocus) {
      if (textRef && textRef.current) {
        textRef.current.focus();
      }
    }
  }, [autoFocus]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setText(e.target.value);
    if (textRef?.current) {
      autosize(textRef.current);
    }
  }

  function handleReset(): void {
    setText("");
    if (textRef && textRef.current) {
      textRef.current.style.height = "initial";
    }
    setIsLoading(false);
  }
  type Body = {
    text: string;
    slug?: string;
    parentId?: string;
  };

  const body = { text, slug, parentId };
  const onSubmit = useMutation({
    mutationFn: async () => {
      return await axios.post<Body>(`/api/posts/${slug}`, body);
    },
  });
  const handleSubmit = async () => {
    await onSubmit.mutateAsync(); //@ts-ignore
    onReply({ text, parentId });
    setIsLoading(true);
    hideEarlyCallback?.();
    handleReset();
    handleResetCallback?.();
  };
  return (
    <>
      <div className="flex flex-grow flex-col justify-between w-full min-h-10 rounded space-y-4 ">
        <div className=" flex items-center space-x-2 ">
          {!session && (
            <button
              className="focus-ring"
              onClick={() => signIn()}
              aria-label="Create new account"
            >
              <User className="text-gray-600 w-7 h-7" />
            </button>
          )}
          {session && <Avatar user={session?.user} />}

          <label className="flex-grow flex items-center cursor-text select-none focus-within-ring min-h-10">
            <span className="sr-only">Enter a comment</span>
            <textarea
              className="form-text flex-1 block mt-1 bg-transparent flex-grow leading-loose min-h-5 max-h-36 resize-none m-1 px-0 text-gray-700 dark:text-gray-50 placeholder-red-600 dark:placeholder-pink-200 border-none overflow-auto text-sm rounded-lg transition-opacity disabled:opacity-50 focus:outline-none focus:shadow-none focus:ring-0"
              placeholder={session ? `Add a comment...` : "Fast Social Login"}
              rows={1}
              value={text}
              onChange={handleChange}
              ref={textRef}
              disabled={!session}
            ></textarea>
          </label>
          {session && (
            <div className="h-full justify-between">
              <button
                className={cn(
                  "text-indigo-500 dark:text-indigo-400 hover:text-green-600 font-semibold px-2 text-xs h-full max-h-10 border border-transparent focus-ring",
                  {
                    "cursor-not-allowed opacity-30":
                      text.length < 1 || isLoading,
                  }
                )}
                disabled={text.length < 1}
                aria-label="Submit new post"
                onClick={handleSubmit}
              >
                {submitLabel}
              </button>
              <button
                className={cn(
                  "text-pink-400 dark:text-pink-200 hover:text-yellow-500 font-semibold text-xs h-full max-h-10 border border-transparent focus-ring"
                )}
                aria-label="Sign Out"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          )}
          {!session && (
            <button
              className="py-1 px-2 rounded bg-indigo-500 font-semibold text-sm text-white disabled:opacity-40 hover:bg-indigo-700"
              onClick={() => signIn()}
              aria-label="log in!"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </>
  );
};

/*     <form>
      <textarea
        className="flex max-h-40 w-full resize-y rounded bg-gray-200 p-3 text-gray-900 placeholder-gray-500"
        rows={1}
        autoFocus={autoFocus}
        placeholder={session ? `Add a comment...` : 'Fast Social Login'}
        onChange={handleChange}
        ref={textRef}
        value={text}
        disabled={!!loading && !session}
      />

      <>
        {session && (
          <>
            <>
              <div className="relative flex w-full flex-none">
                <div className="absolute bottom-1 right-1">
                  <button
                    data-cy="submit-comment-button"
                    type="submit"
                    disabled={!!loading && !session}
                    onSubmit={handleSubmit}>
                    {submitLabel}
                  </button>
                </div>
              </div>
            </>
          </>
        )}
        {!session && (
          <>
            <Link
              href={`/api/auth/signin`}
              className=" rounded bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 disabled:opacity-40"
              onClick={() => signIn()}>
              <button type="button">Log In</button>
            </Link>
          </>
        )}
      </>
      <div ref={parent} className="pt-2 text-sm font-medium text-red-500">
        {error}
      </div>
    </form> */
