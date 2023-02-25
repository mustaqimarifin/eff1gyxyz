import { definitions } from "./supabase";
import { Database } from "types/asstypes";
type Users = Database["public"]["Tables"]["users"]["Row"];

type UserComments = Database["public"]["Views"]["userComments"]["Row"];
export type CommentType = {
  id: UserComments["id"];
  cn_id?: number;
  name: UserComments["name"];
  image: UserComments["image"];
  cnp_id?: number;
  combId?: number;
  commentId?: UserComments["id"];
  slug: UserComments["slug"];
  text: UserComments["text"];
  authorId?: UserComments["authorId"];
  parentId?: UserComments["parentId"];
  createdAt: UserComments["createdAt"];
  rootComment: CommentType;
  rootComments?: CommentType[];
  updatedAt?: UserComments["updatedAt"];
  author: definitions["users"];
  repliesCount: number;
  replies?: CommentType[];
  comment: CommentType;
  parent?: CommentType;
  depth: number;
  pages: CommentType[][];
  justAuthored?: boolean;
  continueThread?: boolean;
  highlight?: boolean;
  isDeleted: boolean;
  isApproved: boolean;
  totalChildrenCount?: number;
  pageIndex?: number;
  path: number[];
  votes: number;
  upvotes: number;
  downvotes: number;
  userVoteValue: number;
  pathVotesRecent: number[];
  pathLeastRecent: number[];
  pathMostRecent: number[];
};

export interface User {
  handle?: string;
  name?: string;
  role?: any;
  id: string;
  image?: string;
}

//export type Like = Partial<definitions['likes']>;
