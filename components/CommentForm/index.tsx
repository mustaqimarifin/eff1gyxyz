import { useEffect, useRef, useState } from "react";
import type { Comment } from "@prisma/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { signIn, signOut, useSession } from "next-auth/react";
import User from "lib/utils/User";
import cn from "clsx";
import { autosize } from "lib/utils/index";
interface CommentFormProps {
  autoFocus?: boolean;
  buttonText?: string;
  initialValue?: string;

  error?: string;
  onSubmit: (text: string) => Promise<Comment | void>;
  parentId?: Comment | null;
  placeholder?: string;
  submitLabel?: string;
  handleResetCallback?: () => void;
  hideEarlyCallback?: () => void;
}

export const CommentForm = ({
  autoFocus = false,
  submitLabel = "Post",
  hideEarlyCallback,
  handleResetCallback,
  error,
  initialValue = "",

  onSubmit,
}: CommentFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState(initialValue);
  const { data: session } = useSession();
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const textRef = useRef<HTMLTextAreaElement | null>(null);

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
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit(text).then(() => {
      setText("");
      setIsLoading(true);
      hideEarlyCallback?.();
      handleReset();
      handleResetCallback?.();
    });
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
                onClick={handleSubmit}
                aria-label="Submit new post"
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
        <div ref={parent} className="pt-2 text-sm font-medium text-red-500">
          {error}
        </div>
      </div>
    </>
  );
};

/* <form onSubmit={handleSubmit}>
   <div className="mt-4 flex flex-row">
     <textarea
       autoFocus={autoFocus}
       value={text}
       onChange={(e) => setText(e.target.value)}
       className="mr-2 h-20 grow resize-none rounded-lg border-2 border-purple-300 p-2 leading-6"
     />
     <button
       className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400"
       type="submit"
       disabled={!!isLoading}>
       {isLoading ? '...' : submitLabel}
     </button>
   </div>
   <div ref={parent} className="pt-2 text-sm font-medium text-red-500">
     {error}
   </div>
 </form>; */

/* <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough">Michael Gough</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">Feb. 8, 2022</time></p>
            </div>
            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button">
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                    </path>
                </svg>
                <span className="sr-only">Comment settings</span>
            </button>
            <!-- Dropdown menu -->
            <div id="dropdownComment1"
                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                        <a href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                    </li>
                    <li>
                        <a href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                </ul>
            </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
            instruments for the UX designers. The knowledge of the design tools are as important as the
            creation of the design strategy.</p>
        <div className="flex items-center mt-4 space-x-4">
            <button type="button"
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                Reply
            </button>
        </div>
    </article> */
