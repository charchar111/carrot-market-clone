import { Answer, Post, User } from "@prisma/client";

export interface IResponse {
  ok: boolean | undefined;
}

export interface IFormCommunityWrite {
  title: string;
  content: string;
}

export interface IResponseCommunityWrite extends IResponse {
  post?: { id: number };
}

interface AnswerWithUser {
  createdAt: string;
  content: string;
  id: number;
  user: User;
}

interface PostWithUser extends Post {
  user: {
    id: Number;
    name: string;
    avatar: string;
  };
  _count: { Answers: number; Wonderings: number };
  Answers: AnswerWithUser[];
}

export interface IResponsePostDetail extends IResponse {
  post?: PostWithUser;
  isAlreadyWonder: boolean;
}

export interface IFormCommunityAnswer {
  answer: string;
}

export interface IResponseAnswerData extends IResponse {}

interface PostWithRelation extends Post {
  _count: { Answers: number; Wonderings: number };
  user: { id: number; name: string };
}

export interface IResponseCommunityPostsAll extends IResponse {
  posts: PostWithRelation[];
}
