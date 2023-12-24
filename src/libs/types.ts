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
  createdAt: Date;
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
