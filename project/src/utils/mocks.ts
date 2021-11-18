import { address, datatype, internet, lorem, name, system, commerce } from 'faker';
import { MAX_RATING } from '../const';
import { AuthData } from '../types/auth-data';
import { AuthInfo } from '../types/auth-info';
import { CommentGet, CommentPost, CommentsGet } from '../types/comment';
import { AuthInfoFromServer, CommentFromServer, CommentsFromServer, OffersFromServer, UserFromServer } from '../types/data-from-server';
import { City, Location, Offer, Offers } from '../types/offers';
import { User } from '../types/user';

const makeRating = (): number => datatype.number(MAX_RATING);

export const makeUser = (): User => ({
  'id': datatype.number(),
  'name': name.title(),
  'avatarUrl': system.filePath(),
  'isPro': datatype.boolean(),
});

export const makeUserFromServer = (): UserFromServer => ({
  'id': datatype.number(),
  'name': name.title(),
  'avatar_url': system.filePath(),
  'is_pro': datatype.boolean(),
});

export const makeLocation = (): Location => ({
  latitude: +address.latitude(),
  longitude: +address.longitude(),
  zoom: datatype.number(20),
});

export const makeUserAuthData = (): AuthData => ({
  email: internet.email(),
  password: internet.password(2, undefined, '(?=.*[0-9])(?=.*[A-Za-z])([0-9A-Za-z]+)'),
});

export const makeUserAuthInfo = (): AuthInfo => ({
  ...makeUser(),
  'email': internet.email(),
  'token': datatype.string(10),
});

export const makeUserAuthInfoFromServer = (): AuthInfoFromServer => ({
  ...makeUserFromServer(),
  'email': internet.email(),
  'token': datatype.string(10),
});

export const makeCityName = (): string => address.city();
export const makeCity = (): City => ({
  location: makeLocation(),
  name: makeCityName(),
});

export const makeOffer = (): Offer => ({
  bedrooms: datatype.number(5),
  city: makeCity(),
  description: lorem.paragraph(),
  goods: Array(datatype.number(5)).fill(null).map(() => commerce.product()),
  host: makeUser(),
  id: datatype.number(),
  images: Array(datatype.number(5)).fill(null).map(() => system.filePath()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeLocation(),
  maxAdults: datatype.number(5),
  previewImage: system.filePath(),
  price: datatype.number(),
  rating: makeRating(),
  title: lorem.sentence(),
  type: lorem.word(),
});

export const makeOfferFromServer = () => ({
  bedrooms: datatype.number(5),
  city: makeCity(),
  description: lorem.paragraph(),
  goods: Array(datatype.number(5)).fill(null).map(() => commerce.product()),
  host: makeUserFromServer(),
  id: datatype.number(),
  images: Array(datatype.number(5)).fill(null).map(() => system.filePath()),
  'is_favorite': datatype.boolean(),
  'is_premium': datatype.boolean(),
  location: makeLocation(),
  'max_adults': datatype.number(5),
  'preview_image': system.filePath(),
  price: datatype.number(),
  rating: makeRating(),
  title: lorem.sentence(),
  type: lorem.word(),
});

export const makeOffers = (): Offers =>
  Array(datatype.number(3)).fill(null).map(() => makeOffer());

export const makeOffersFromServer = (): OffersFromServer =>
  Array(datatype.number(3)).fill(null).map(() => makeOfferFromServer());

const makeCommentGet = (): CommentGet => ({
  comment: lorem.paragraph(),
  date: datatype.datetime(),
  id: datatype.number(),
  rating: makeRating(),
  user: makeUser(),
});

export const makeCommentsGet = (): CommentsGet =>
  Array(datatype.number(12)).fill(null).map(() => makeCommentGet());

export const makeCommentPost = (): CommentPost => ({
  comment: lorem.paragraph(),
  rating: makeRating(),
});

export const makeCommentFromServer = (): CommentFromServer => ({
  'comment': lorem.paragraph(),
  'date': datatype.datetime().toString(),
  'id': datatype.number(),
  'rating': makeRating(),
  'user': makeUserFromServer(),
});

export const makeCommentsFromServer = (): CommentsFromServer => Array(datatype.number(12)).fill(null).map(() => makeCommentFromServer());
