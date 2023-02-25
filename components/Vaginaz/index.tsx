import { CommentForm } from "./form";
import useComments from "./hooks/useComment";
import Comment from "./comment";
import { Post } from "types";

type Cprops = {
  slug?: Post["slug"];
  id?: Post["id"];
};
function Comments({ slug, id }: Cprops) {
  const { getReplies, rootComments, onSubmit, onReply } = useComments();
  /*   const addComment = useMutation(onReply);

  return await createComment.mutateAsync(onReply);
    console.log(todo);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('done');
  } */

  return (
    <div id="supadupa" className="mt-5 p-2 w-full">
      <h3 className="text-2xl mb-5 font-gt text-center w-full">Comments</h3>
      <CommentForm
        submitLabel="Post"
        placeholder="REPLYYY"
        handleSubmit={onSubmit}
        /* {`Reply to comment by ${comments.filter((comment) => {
            comment.author;
          })}`} */
      />
      <div className="mt-2 overscroll-contain">
        <div className="comments-container">
          {rootComments?.map((x) => (
            <Comment
              key={x.id}
              comment={x}
              replies={getReplies(x.id)}
              userId={x.userId}
              pageIndex={undefined}
              addComment={undefined} //addComment={addComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comments;
