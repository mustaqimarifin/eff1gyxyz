import supabase from "lib/utils/supaPublic";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
//import { getURL } from './clearUrl';

//import clearUrl, { refURL } from './clearUrl';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).send("Unauthorized");
  }

  if (req.method === "GET") {
    const { data: comments, error } = await supabase
      .from("userComments")
      .select("*")
      .filter("slug", "eq", req.query)
      .order("createdAt", { ascending: false });

    if (comments) {
      return res.status(200).json(comments);
    }
    if (error)
      return res.status(400).json({
        message: "Unsupported Request",
      });
  }
  const { slug, text, parentId } = req.body;
  const newComment = {
    authorId: session?.user?.id,
    text,
    parentId: parentId || null,
    slug,
  };

  if (req.method === "POST") {
    const { data: comment, error } = await supabase
      .from("comments")
      .insert([newComment])
      .single();

    if (comment) {
      return res.status(200).json(comment);
    }
    if (error)
      return res.status(400).json({
        message: `Comment has wandered into the abyss`,
      });
  }
}
