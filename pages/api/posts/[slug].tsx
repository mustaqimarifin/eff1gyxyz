import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import type { Comment, Post } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { Komment } from "types";
import { Session } from "next-auth";
//import { getURL } from './clearUrl';

//import clearUrl, { refURL } from './clearUrl';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: Session | null = await getServerSession(req, res, authOptions);
  //console.log(topic)
  const { text, slug, parentId } = req.body;
  console.log(req.body);

  if (!session) {
    return res.status(403).send("Unauthorized");
  }

  if (session && req.method === "POST") {
    const newEntry: Comment = await prisma.comment.create({
      data: {
        text,
        //slug,
        parent: { connect: { id: String(parentId) } },
        user: { connect: { id: String(session.user.id) } },
        post: {
          connectOrCreate: {
            where: {
              slug,
            },
            create: {
              slug,
            },
          },
        },
      },
      include: {
        replies: true,
      },
    });

    return res.status(200).json({
      id: newEntry.id.toString(),
      text: newEntry.text,
      name: session.user.name,
      image: session.user.image,
      slug: newEntry.slug,
      userId: session.user.id,
      createdAt: newEntry.createdAt.toString(),
    });
  }
  //const seaslug = getSlug(req.headers.referrer)

  const comments = await prisma.comment.findMany({
    where: {
      parentId: null,
    },
    include: {
      user: true,
      replies: true,
    },
  });

  /*     select: {
      id: true,
      text: true,
      slug: true,
      parentId: true,
      createdAt: true,
      replies: true,

      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: { select: { likes: true } },
    }, */

  /*     .then(async (comments) => {
      const likes = await prisma.like.findMany({
        where: {
          userId: session?.user?.id,
          commentId: { in: comments.map((comment) => comment.id) },
        },
      });


    }); */
  if (req.method === "GET") {
    return res.json(
      comments.map((comment) => ({
        id: comment.id.toString(),
        text: comment.text,
        name: comment?.user?.name,
        image: comment?.user?.image,
        replies: comment?.replies,
        slug: comment.slug,
        createdAt: comment.createdAt.toString(),
        userId: comment?.userId,
      }))
    );
  }
}

/* const posts = await prisma.post
      .findUnique({
        where: { slug },
        select: {
          slug: true,
          comments: {
            orderBy: {
              createdAt: 'desc',
            },
            select: {
              id: true,
              text: true,
              parentId: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              _count: { select: { likes: true } },
            },
          },
        },
      })
      .then(async (post) => {
        const likes = await prisma.like.findMany({
          where: {
            userId: session?.user?.id,
            commentId: { in: post?.comments.map((comment) => comment.id) },
          },
        })
        console.log(posts)

        return {
          ...post,
          comments: post?.comments.map((comment) => {
            const { _count, ...commentFields } = comment
            return {
              ...commentFields,
              likedByMe: !!likes.find(
                (like) =>
                  like.commentId === comment.id &&
                  like.userId === session?.user?.id
              ),
              likeCount: _count.likes,
            }
          }),
        }
      })
    return res.json(
      posts.comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        name: comment.user.name,
        image: comment.user.image,
        createdAt: comment.createdAt.toString(),
        userId: comment.user.id,
      }))
    )
  } */
