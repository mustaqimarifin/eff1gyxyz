import React, { useState, useEffect } from "react";
import { CommentForm } from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
} from "./kopee";
import { CommentType } from "types/interface";
import { Database } from "types/asstypes";
import { useSession } from "next-auth/react";
import type { Comments } from "./CommentForm";
import { User } from "next-auth";
type UserComments = Database["public"]["Views"]["userComments"]["Row"];
type Users = Database["public"]["Tables"]["users"]["Row"];

type Props = {
  slug: UserComments["slug"];
};

const Comments: React.FC<Props> = ({ slug }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments: CommentType[] = comments.filter(
    (comment) => comment?.parentId === null
  );

  const getReplies = (commentId) =>
    comments
      .filter((comment) => comment?.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (slug, text, parentId, session) => {
    createCommentApi(text, parentId, slug, session).then((comment) => {
      setComments([comment, ...comments]);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId: Comments["id"]) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId).then(() => {
        const updatedComment = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updatedComment);
      });
    }
  };

  useEffect(() => {
    getCommentsApi(slug).then((data) => setComments(data));
  }, [slug]);

  return (
    <div id="supadupa" className="mt-5 p-2 w-full">
      <h3 className="text-2xl mb-5 font-gt text-center w-full">Comments</h3>
      <CommentForm
        submitLabel="Post"
        placeholder="REPLYYY"
        /* {`Reply to comment by ${comments.filter((comment) => {
            comment.author;
          })}`} */
        handleSubmit={addComment}
      />
      <div className="mt-2 overscroll-contain">
        <div className="comments-container">
          {rootComments.map((x) => (
            <Comment
              key={x.id}
              comment={x}
              replies={getReplies(x.id)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              deleteComment={deleteComment}
              authorId={x.authorId}
              pageIndex={undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;

/*   const addComment = async (text, parentId = null) => {
    const newComment = {
      authorId: user?.id,
      name: profile?.full_name,
      image: profile?.avatar_url,
      text: text,
      parentId: parentId || null,
      slug: slug
    };
    const { body } = await supabase.from('comments').insert([newComment]);
    setComments([body, ...comments]); */
//setActiveComment(null);
//setActiveComment(null);

/*   const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedComment = comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, body: text };
        }
        return comment;
      });
      setComments(updatedComment);
      setActiveComment(null);
    });
  }; */

/* const addComment = async (text, parentId = null, name, image) => {
    const user = supabase.auth.user();
    const session = supabase.auth.session();

    let newComment = {
      authorId: user?.id,
      name: session?.user?.user_metadata?.full_name,
      image: session?.user?.user_metadata?.avatar_url,
      text: text,
      parentId: parentId || null,
    };
    try {
      let { body } = await supabase
        .from("comments")
        .insert([newComment])
        .single();
      setComments(body);
  } catch (error) {
      console.log("error", error);
    }
    return body;

  };

  /*   const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedComment = comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, text };
        }
        return comment;
      });
      setComments(updatedComment);
      setActiveComment(null);
    });
  }; */
/* 
  const deleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      try {
        await supabase.from("comments").delete().eq("id", commentId);
        setComments(comments.filter((x) => x.id != commentId));
      } catch (error) {
        console.log("error", error);
      }
      return {};
    }
  }; */

/*   useEffect(() => {
    fetchComments();
  }, []);
  const fetchComments = async () => {
    let { data: comments, error } = await supabase
      .from("comment_with_author")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setComments(comments);
  };  */

/* return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {xs.map((x) => (
          <Comment
            key={x.id}
            comment={x}
            replies={getReplies(x.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            authorId={x?.authorId}
          />
        ))}
      </div>
    </div>
  );
};

export default Rawmen;
 */
