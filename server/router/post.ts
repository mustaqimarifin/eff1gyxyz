import { createRouter } from "./context";
import { z } from "zod";

export const postRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany();
    },
  })
  .query("getBySlug", {
    input: z.object({ slug: z.string() }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.post
        .findUnique({
          where: { slug: input.slug },
          select: {
            id: true,
            comments: {
              orderBy: {
                createdAt: "desc",
              },
              select: {
                id: true,
                slug: true,
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
        .then(async (post: any) => {
          const likes = await ctx.prisma.like.findMany({
            where: {
              userId: ctx.session?.user?.id,
              commentId: {
                in: post?.comments.map((comment: { id: any }) => comment?.id),
              },
            },
          });

          return {
            ...post,
            comments: post?.comments.map(
              (comment: { [x: string]: any; id?: any; _count?: any }) => {
                const { _count, ...commentFields } = comment;
                return {
                  ...commentFields,
                  likedByMe: !!likes.find(
                    (like) =>
                      like.commentId === comment.id &&
                      like.userId === ctx.session?.user?.id
                  ),
                  likeCount: _count.likes,
                };
              }
            ),
          };
        });
    },
  });
