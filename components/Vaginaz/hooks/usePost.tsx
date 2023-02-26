import { Post } from "types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Komment } from "types";
import { useEffect, useState, useMemo } from "react";
export const usePost = (slug: string) => {
  const { data: comments } = useQuery<Komment[]>({
    queryKey: ["comments"],
    queryFn: () => axios.get(`/api/posts/${slug}`).then((res) => res.data),
  });
  const commentsByParentId = useMemo(() => {
    if (comments === null) return null;

    const group: { [key: string]: Komment[] } = {};

    comments?.forEach((comment) => {
      group[comment.parentId!] ||= [];
      group[comment.parentId!]?.push(comment);
    });

    return group;
  }, [comments]);

  const getReplies = (parentId: string) => {
    return commentsByParentId?.[parentId] || [];
  };

  const onDelete = async ({ id }: Komment) => {
    try {
      await axios.delete(`/api/comments/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    comments,
    rootComments: commentsByParentId?.["null"] || [],
    getReplies,
    onDelete,
  };
};
