/* eslint-disable react-hooks/exhaustive-deps */
//import signInModal from './SignInModal';
import User from "lib/utils/icons/User";
//import supabase from 'lib/utils/supaPublic';
//import punctuationRegex from 'threads/utils/regex/punctuationRegex';
import cn from "clsx";
import { autosize } from "lib/utils/index";
import React, { useRef, useState, useEffect } from "react";
import Avatar from "./Avatar";
//import useSWR from 'swr';
//import { yespls } from 'lib/utils';

//import { useUser } from '@supabase/auth-helpers-react';
//import { profile } from 'console';
//import { definitions } from 'types/supabase';
//import router from 'next/router';
//import BLOG from 'blog.config';
//import { useUser } from 'hooks/use-user';
//import { useSession, useSessionContext } from '@supabase/auth-helpers-react';
//import SignInModal from './SignInModal';
import { signIn, signOut, useSession } from "next-auth/react";
//import Bodal from './Bodal';
import { Database } from "types/asstypes";
import { definitions } from "types/supabase";

export type Comments = Database["public"]["Tables"]["comments"]["Row"];

interface Props {
  user?: definitions["users"];
  parentId?: Comments["parentId"] | null;
  handleSubmit: any;
  placeholder?: string;
  submitLabel?: string;
  autofocus?: boolean;
  handleResetCallback?: () => void;
  hideEarlyCallback?: () => void;
}

/*  export const session = async () => {
  const { data } = await supabase.auth.getSession();
return data
}
 
 */

export const CommentForm = ({
  handleSubmit,
  submitLabel = "Post",
  handleResetCallback,
  hideEarlyCallback,
  autofocus = false,
}: Props): JSX.Element => {
  //const { user, profile } = useUser();
  //const session = useSession();
  //const supabase = useSupabaseClient();
  const { data: session } = useSession();
  const [text, setText] = useState<Comments["text"]>("");
  const [slug, setSlug] = useState<Comments["slug"]>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //const { session, user, profile } = useUser();
  /*   const { open, isOpen } = useModal({
    bodal: Bodal,
  }); */
  /*   const { data, mutate } = useSWR(() => {
    const query = new URLSearchParams({ slug });
    return `/api/comment?${query.toString()}`;
  }, yespls);

 */

  useEffect(() => {
    const slug = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    setSlug(slug);
  }, [slug]);

  //const [comments, setComments] = useState([]);
  //const [activeComment, setActiveComment] = useState(null);
  //const { mutateGlobalCount } = useComments();

  //const user = supabase.auth.user();
  /*   const query = new window.location.pathname();
  const slug = query.split('/').slice(2); */
  /*   let slug = (url) => new URL(url).pathname.match(/[^\/]+/g);
   */

  /*   useEffect(() => {
    if (user && profile && (!profile.full_name || !profile.user_name)) {
      open('bodal');
    }
  }, [user, profile]); */

  /*   useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
    }
  }, [isOpen]); */

  useEffect(() => {
    if (autofocus) {
      if (textRef && textRef.current) {
        textRef.current.focus();
      }
    }
  }, [autofocus]);

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

  async function onSubmit(e) {
    e.preventDefault();
    handleSubmit(text);
    setIsLoading(true);
    hideEarlyCallback?.();
    /*     if (!session?.user) {
      return open('bodal');
    } */

    handleReset();
    handleResetCallback?.();
  }

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
            <text
              className="form-text flex-1 block mt-1 bg-transparent flex-grow leading-loose min-h-5 max-h-36 resize-none m-1 px-0 text-gray-700 dark:text-gray-50 placeholder-red-600 dark:placeholder-pink-200 border-none overflow-auto text-sm rounded-lg transition-opacity disabled:opacity-50 focus:outline-none focus:shadow-none focus:ring-0"
              placeholder={session ? `Add a comment...` : "Fast Social Login"}
              rows={1}
              value={text}
              onChange={handleChange}
              ref={textRef}
              disabled={!session}
            ></text>
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
                onClick={onSubmit}
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
