import { PAGE_SIZE } from "lib/utils/index";
import { CommentType } from "types/interface";
import supabase from "lib/utils/supaPublic";
import { arrayToTree } from "performant-array-to-tree";
import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { definitions } from "types/supabase";
import { Comments } from "components/comments/CommentForm";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

export type SortingBehavior =
  | "pathVotesRecent"
  | "pathLeastRecent"
  | "pathMostRecent";

interface CommentsContextInterface {
  commentId: Comments["id"];
  user: User;
  rootComment: CommentType | null | undefined;
  comments: CommentType[];
  rootId: string | null;
  count: number | null | undefined;
  remainingCount: number | null;
  error: any;
  commentsError: any;
  isLoadingFallbackData: boolean;
  isLoadingMore: boolean;
  isEmpty: boolean;
  isReachingEnd: boolean | undefined;
  loadMore: () => void;
  mutateComments: any;
  mutateGlobalCount: any;
  mutateRootComment: any;
  sortingBehavior: SortingBehavior;
  setSortingBehavior: (behavior: SortingBehavior) => void;
  setSize: (
    size: number | ((size: number) => number)
  ) => Promise<any[] | undefined | null> | null;
}
const CommentsContext = createContext<CommentsContextInterface>({
  commentId: null,
  user: null,
  rootComment: null,
  comments: [],
  rootId: null,
  count: null,
  remainingCount: null,
  error: null,
  commentsError: null,
  isLoadingFallbackData: false,
  isLoadingMore: false,
  isEmpty: true,
  isReachingEnd: true,
  loadMore: () => {
    return;
  },
  mutateComments: null,
  mutateGlobalCount: null,
  mutateRootComment: null,
  sortingBehavior: "pathVotesRecent",
  setSortingBehavior: () => {
    return;
  },
  setSize: () => {
    return null;
  },
});

interface CommentsContextProviderProps {
  commentId: string;
  [propName: string]: any;
}

const postgresArray = (arr: any[]): string => `{${arr.join(",")}}`;

export const CommentsContextProvider = (
  props: CommentsContextProviderProps
): JSX.Element => {
  const { commentId } = props;
  const { data: session } = useSession();
  const user: User = session?.user;
  const [sortingBehavior, setSortingBehavior] =
    useState<SortingBehavior>("pathVotesRecent");

  const {
    data: count,
    mutate: mutateGlobalCount,
    error: commentsError,
  } = useSWR<number | null, any>(`globalCount_${commentId}`, {
    fallbackData: null,
    fetcher: () => null,
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  const { data: rootComment, mutate: mutateRootComment } = useSWR(
    ["comments", commentId, user],
    async (_, commentId, _user) =>
      supabase
        .from("userComments")
        .select("*")
        .eq("id", commentId)
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
            throw error;
          }

          if (!data?.[0]) return null;

          return data[0] as unknown as CommentType;
        })
  );

  const getKey = (
    pageIndex: number,
    previousPageData: CommentType[],
    commentId: string | null,
    sortingBehavior: SortingBehavior,
    user: User | null
  ): [string, string, SortingBehavior, User | null] | null => {
    if (!commentId) return null;
    if (previousPageData && !previousPageData.length) return null;
    if (pageIndex === 0) {
      return [
        "userComments",
        postgresArray([commentId]),
        sortingBehavior,
        user,
      ];
    }

    return [
      "userComments",
      postgresArray(
        previousPageData[previousPageData.length - 1][sortingBehavior]
      ),
      sortingBehavior,
      user,
    ];
  };

  const {
    data,
    error,
    size,
    setSize,
    mutate: mutateComments,
  } = useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, commentId, sortingBehavior, user), // Include user to revalidate when auth changes
    async (_name, path, sortingBehavior, _user) => {
      return (
        supabase
          .from("comments_thread_with_user_vote")
          .select("*", { count: "exact" })
          .contains("path", [commentId])
          // .lt('depth', MAX_DEPTH)
          .gt(sortingBehavior, path)
          .order(sortingBehavior as any)
          .limit(PAGE_SIZE)
          .then(({ data, error, count: tableCount }) => {
            if (error) throw error;
            if (!data) return null;
            mutateGlobalCount((count) => {
              if (count) return count;
              return tableCount;
            }, false);

            return data;
          })
      );
    },
    {
      revalidateOnFocus: false,
      // revalidateOnMount: !cache.has(['comments_thread_with_user_vote', postgresArray([commentId])]),
    }
  );

  const flattenedComments = data ? data.flat() : [];

  const rootParentIds = flattenedComments
    .filter((comment) => comment.parentId === commentId)
    .map((comment) => comment.parentId)
    .reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue]: true,
      }),
      {}
    );

  const comments: CommentType[] = data
    ? (arrayToTree(flattenedComments, {
        dataField: null,
        childrenField: "replies",
        rootParentIds,
      }) as CommentType[])
    : [];
  const isLoadingFallbackData = !data && !error;
  const isLoadingMore =
    isLoadingFallbackData ||
    !!(size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = !data || data?.[0]?.length === 0;
  const remainingCount =
    !count || isEmpty ? 0 : count - flattenedComments.length;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  function loadMore(): void {
    if (isLoadingMore || isReachingEnd) return;
    setSize(size + 1);
  }

  const value = {
    commentId,
    user,
    comments,
    rootComment,
    commentsError,
    rootId: commentId,
    count,
    remainingCount,
    error,
    isLoadingFallbackData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore,
    mutateComments,
    mutateGlobalCount,
    mutateRootComment,
    sortingBehavior,
    setSortingBehavior,
    setSize,
  };

  return <CommentsContext.Provider value={value} {...props} />;
};

export function useComments(): CommentsContextInterface {
  const context = useContext(CommentsContext);

  if (context === undefined) {
    throw new Error(
      `useComments must be used within a CommentsContextProvider.`
    );
  }

  return context;
}
