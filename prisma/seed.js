import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await Promise.all([
    await prisma.post.create({
      data: {
        slug: "what-make-vs-code",
      },
    }),
    await prisma.post.create({
      data: {
        slug: "react-notion-is-better",
      },
    }),
    await prisma.post.create({
      data: {
        slug: "adding-http-response-headers-to-a-netlify-static-website",
      },
    }),
    await prisma.post.create({
      data: {
        slug: "applying-the-active-class-for-the-current-page-in-jekyll",
      },
    }),
    await prisma.post.create({
      data: {
        slug: "creating-navigation-menu-in-jekyll",
      },
    }),
    await prisma.post.create({
      data: {
        slug: "css-hacks-you-may-not-know",
      },
    }),
  ]);
}

seed();

/*   const post2 = await prisma.post.create({
    data: {
      slug: 'beginners-gusluge-to-the-programming-portfolio',
    },
  });

  const post3 = await prisma.post.create({
    data: {
      slug: 'career',
    },
  });
  const post4 = await prisma.post.create({
    data: {
      slug: 'fonts',
    },
  });
  const post5 = await prisma.post.create({
    data: {
      slug: 'dx',
    },
  }); */

/*  const comment3 = await prisma.comment.create({
    data: {
      message: 'I am another root comment in a vagina',
      userslug: sally.slug,
      slug: post4.slug
    }
  });

  const like1 = await prisma.like.create({
    data: {
      commentslug: comment1.slug,
      userslug: sally.slug
    }
  }); */
