/* eslint-disable camelcase */

import { User } from 'next-auth';
export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;


export type PostType = 'Post' | 'Page' | 'Project';

export type PostStatus = 'Idea' | 'Published' | 'Revise' | 'Published';

export type Post = {
  id: string;
  createdTime: string;
  fullWidth?: boolean;
  title?: string;
  slug?: string;
  //outer_link?: string;
  summary?: string;
  tags?: string[];
  date: {
    start_date?: string;
  };
  status?: [PostStatus];
  type: [PostType];
  comments?: Komment[];
  //repo_url: string;
  //thumbnail_url: string;
};

export type Comment = {
  id: string;
  text: string;
  slug: string;
  createdAt: Date;
  parentId: string | null;
  user: {
    id: string;
    name: string;
    image: string;
  };
  likeCount: number;
  likedByMe: boolean;
  commentId?: string;
  highlight?: boolean;
  isDeleted?: boolean;
  replies?: Comment[];
};

export type Komment = {
  user: User;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  text: string;
  name: string;
  image: string;
  userId: string;
  likeCount: number;
  likedByMe?: boolean;
  isDeleted?: boolean;
  rootComments?: Komment[];
  highlight?: boolean;
  replies?: Komment[];
  parentId?: string;
};

/* export type User = {
  id: string;
  name: string;
  image: string;
}; */
export type Project = Post & {
  repo_url: string;
  thumbnail_url: string;
};

export type TagObj = { [key: string]: number };

export type BlogConfig = {
  title: string;
  author: string;
  email: string;
  link: string;
  description: string;
  lang: 'en-US' | 'zh-CN' | 'zh-HK' | 'zh-TW' | 'ja-JP' | 'es-ES';
  appearance: 'class' | 'dark' | 'light';
  font: 'sans-serif' | 'serif';
  lightBackground: `#${string}`;
  darkBackground: `#${string}`;
  path: string;
  profileSlug: string;
  since: number;
  sortByDate: boolean;
  showAbout: boolean;
  showArchive: boolean;
  autoCollapsedNavBar: boolean;
  ogImageGenerateURL: string;
  socialLink: string;
  seo: {
    keywords: string[];
    googleSiteVerification: string;
  };
  notionPageId: string;
  notionAccessToken: string;
  analytics: {
    provider: 'ga' | 'ackee';
    ackeeConfig: {
      tracker: string;
      dataAckeeServer: string;
      domainId: string;
    };
    gaConfig: {
      measurementId: `G-${string}`;
    };
  };
  comment: {
    provider: 'cusdis' | '';
    utterancesConfig: {
      repo: string;
    };
  };
  isProd: 'development' | 'preview' | 'production';
};
