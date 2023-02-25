import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import error from "next/error";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text, parentId } = req.body;
  const session = await getServerSession(req, res, authOptions);

  const comment = await prisma.comment.findUnique({
    where: { id: String(parentId) },
    include: {
      user: true,
      replies: true,
    },
  });

  if (req.method === "GET") {
    return res.json(
      comment?.replies
      /* comment?.replies?.map((reply) => ({
        id: reply.id,
        text: reply.text,
        name: reply?.user.name,
        image: reply?.user?.image,
        parentId: reply?.parentId,
        createdAt: reply.createdAt.toString(),
        userId: reply?.userId,
      })) */
    );
  }
  const commentId = req.query.id;
  if (session && req.method === "DELETE") {
    await prisma.comment.delete({
      where: {
        id: String(commentId),
      },
    });
    return res.json({ message: "Comment deleted!" });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
  if (error) {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
