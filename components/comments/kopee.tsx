import supabase from "lib/utils/supaPublic";
import { definitions } from "types/supabase";
import { Database } from "types/asstypes";
import { Session, User } from "next-auth";
type Comments = Database["public"]["Tables"]["comments"]["Row"];
type UserComments = Database["public"]["Views"]["userComments"]["Row"];
type Users = Database["public"]["Tables"]["users"]["Row"];

export const getComments = async (slug: unknown) => {
  //const [_comments, setComments] = useState([]);

  const { data: comments, error } = await supabase
    .from("userComments")
    .select(`*`)
    .range(0, 9)
    .eq("slug", slug)
    .order("id", { ascending: false });
  if (error) console.log("error", error);
  return comments as definitions["userComments"];
}; /* 
type addC = {
  text: string;
  cnp_id: number | null;
  slug: string;
  user: User;
  profile: definitions['profiles'];
}; */
export const createComment = async (
  text: string,
  slug: string,
  session: Session,
  parentId: string
) => {
  const newComment = {
    authorId: session?.user?.id,
    text,
    parentId: parentId || null,
    slug,
  };
  const { data: comment } = await supabase
    .from("comments")
    .insert([newComment])
    .single();

  return comment as unknown as UserComments;
};
/* {
    id: comment.id,
    text: comment.text,
    name: comment.name,
    image: comment.image,
    parentId: comment.parentId,
    createdAt: comment.createdAt.toISOString()
  }; 
}; */

/* export const updateComment = async (text) => {
  return { text };
}; */

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  try {
    await supabase.from("comments").delete().eq("id", commentId);
    return {};
  } catch (error) {
    console.log("error", error);
  }
};
