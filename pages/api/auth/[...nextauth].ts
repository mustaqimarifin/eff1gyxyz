import prisma from "lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  //debug: process.env.NEXTAUTH_DEBUG === "true",
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  /*   session: {
    strategy: 'jwt'
  }, */
  callbacks: {
    //@ts-ignore
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
        session.isAdmin = user.role === "ADMIN";
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
