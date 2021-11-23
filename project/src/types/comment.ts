import { User } from './user';

export type CommentGet = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
};

export type CommentsGet = CommentGet[];

export type CommentPost = {
  comment: string,
  rating: number,
}
