import { User } from './user';

export type Location = {
  'latitude': number,
  'longitude': number,
  'zoom': number,
};

export type City = {
  location: Location,
  name: string,
};

export type Offer = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: User,
  id: string,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Location,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type Point = Pick<Offer, 'id' | 'location'>;

export type Offers = Offer[];
