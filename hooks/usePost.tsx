/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import type { Comment as Komment } from 'types/index';
import { trpc } from 'utils/trpc';
import { useMemo } from 'react';

export const usePost = (slug: string) => {
  //@ts-ignore
  const post = trpc.useQuery(['post.getBySlug', { slug }]);

  const commentsByParentId = useMemo(() => {
    if (post?.data?.comments === null) return null;

    const group: { [key: string]: Komment[] } = {};

    post.data?.comments?.forEach((comment: Komment) => {
      group[comment.parentId!] ||= [];
      group[comment?.parentId!]?.push(comment);
    });

    return group;
  }, [post?.data?.comments]);

  const getReplies = (parentId: string): Komment[] => {
    return commentsByParentId?.[parentId] || [];
  };

  return {
    post,
    rootComments: commentsByParentId?.['null'] || [],
    getReplies,
  };
};
