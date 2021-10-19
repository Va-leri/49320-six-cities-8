import { User } from './user';

export type Review = {
  objectId: string,
  comment: string,
  date: Date,
  id: number,
  rating: number,
  user: User,
}


export type Reviews = Review[];
