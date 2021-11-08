import { User } from './user';

export type CommentGet = {
  comment: string,
  date: Date,
  id: number,
  rating: number,
  user: User,
};

export type CommentsGet = CommentGet[];

export type CommentPost = {
  comment: string,
  rating: number,
}
