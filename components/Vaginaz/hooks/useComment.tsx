import { Comment } from "@prisma/client";
import axios from "axios";
import { yespls } from "lib/utils";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Komment } from "types";
import { getComments } from "./query";

export default function useComments() {
  const [text, setText] = useState("");
  const [slug, setSlug] = useState<Komment["slug"]>();
  const [parentId, setParentId] = useState();

  const { data: comments } = useQuery<Komment[]>({
    queryKey: ["comments", slug],
    queryFn: () => getComments(slug),
  });

  const rootComments: Komment["rootComments"] = comments?.filter(
    (comment) => comment?.parentId === null
  );
  const rootComments2 = useMemo(() => {
    if (comments === null) return null;

    const group: { [key: string]: Komment[] } = {};

    comments?.forEach((comment) => {
      group[comment.parentId!] ||= [];
      group[comment.parentId!]?.push(comment);
    });

    return group;
  }, [comments]);

  const getReplies = (commentId: string): Komment[] =>
    comments
      ?.filter((comment) => comment?.id === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  useEffect(() => {
    const slug = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    // console.log(slug);
    setSlug(slug);
  }, [slug]);

  type Body = {
    text: string;
    slug?: string;
    parentId?: string;
  };

  const body = { text, slug, parentId };

  const onSubmit = useMutation({
    mutationFn: () => {
      return axios.post<Body>(`/api/posts/${slug}`, body);
    },
  });

  /* 
  const onSubmit = async () => {
    const body = { text, slug, parentId };
    try {
      await axios.post<Body>(`/api/posts/${slug}`, body);
      setText('');
      //setSlug(slug);
      await mutation.mutate();
    } catch (err) {
      console.log(err);
    }
  };
 */
  /*  const onReply = async ({ id }: Comment) => {
    const body = { text, parentId: id };
    try {
      await axios.post<Body>(`/api/comments/${id}`, body);
      setText("");
      // setParentId(parentId);
      await mutate();
    } catch (err) {
      console.log(err);
    }
  }; */

  return {
    text,
    setText,
    rootComments,
    rootComments2,
    getReplies,
    onSubmit,
    /*    onReply,
    onDelete, */
  };
}
