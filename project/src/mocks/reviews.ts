import { Reviews } from '../types/reviews';
import { generateDescription } from '../utils';
import { Ids } from './offer-ids';
import { users } from './users';

export const reviews: Reviews = [
  {
    objectId: Ids[0],
    comment: generateDescription(),
    date: new Date(),
    id: 0,
    rating: 1,
    user: users[0],
  },
  {
    objectId: Ids[0],
    comment: generateDescription(),
    date: new Date(),
    id: 1,
    rating: 4,
    user: users[1],
  },
  {
    objectId: Ids[1],
    comment: generateDescription(),
    date: new Date(),
    id: 2,
    rating: 3,
    user: users[2],
  },
  {
    objectId: Ids[1],
    comment: generateDescription(),
    date: new Date(),
    id: 3,
    rating: 5,
    user: users[1],
  },
  {
    objectId: Ids[2],
    comment: generateDescription(),
    date: new Date(),
    id: 4,
    rating: 3,
    user: users[3],
  },
  {
    objectId: Ids[2],
    comment: generateDescription(),
    date: new Date(),
    id: 5,
    rating: 4,
    user: users[2],
  },
  {
    objectId: Ids[2],
    comment: generateDescription(),
    date: new Date(),
    id: 6,
    rating: 2,
    user: users[1],
  },
  {
    objectId: Ids[3],
    comment: generateDescription(),
    date: new Date(),
    id: 7,
    rating: 5,
    user: users[4],
  },
  {
    objectId: Ids[3],
    comment: generateDescription(),
    date: new Date(),
    id: 8,
    rating: 4,
    user: users[3],
  },
  {
    objectId: Ids[3],
    comment: generateDescription(),
    date: new Date(),
    id: 9,
    rating: 3,
    user: users[2],
  },
];
