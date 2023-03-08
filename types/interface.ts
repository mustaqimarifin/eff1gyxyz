import { definitions } from "./supabase";
import { Database } from "types/arsetypes";
type Users = Database["public"]["Views"]["display_users"]["Row"];

type UserComments =
  Database["public"]["Views"]["comments_with_metadata"]["Row"];
export type CommentType = {
  id: UserComments["id"];
  cn_id?: number;
  name: Users["name"];
  image: Users["avatar"];
  cnp_id?: number;
  combId?: number;
  commentId?: UserComments["id"];
  slug: UserComments["topic"];
  text: UserComments["comment"];
  authorId?: UserComments["user_id"];
  parentId?: UserComments["parent_id"];
  createdAt: UserComments["created_at"];
  rootComment: CommentType;
  rootComments?: CommentType[];
  updatedAt?: string;
  author?: definitions["display_users"];
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
