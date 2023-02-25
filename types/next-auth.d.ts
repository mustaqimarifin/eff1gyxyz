/* eslint-disable @typescript-eslint/no-empty-interface */
import type { User as PrismaUser, UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & Session["user"];
    isAdmin: boolean;
    userId: string;
  }

  interface User extends PrismaUser {}
}

//import { Session } from 'next-auth';

//declare module 'next-auth' {
/**
 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
 */
//interface Session {
// A JWT which can be used as Authorization header with supabase-js for RLS.
//supabaseAccessToken?: string;
// user: {
/** The user's postal address. */
//id: string;
//} & Session['user'];
//isAdmin: boolean;
//userId: string;
// }
//}
