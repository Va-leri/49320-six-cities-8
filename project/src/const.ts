export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export const MAX_RATING = 5;

export const TitleToRatingValue: {
  [key: number]: string,
} = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

export const MAX_REVIEWS_ON_PAGE = 10;
export const ReviewLength = {
  MIN: 50,
  MAX: 300,
};

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];


export enum SortingType {
  Popular = 'Popular',
  PriceAsc = 'Price low to high',
  PriceDesc = 'Price high to low',
  RatingDesc = 'Top rated first',
}

export enum AuthorizationStatus {
  Auth = 'Authorized',
  NoAuth = 'Unauthorized',
  Unknown = 'Unknown',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Nearby = '/nearby',
  Favorites = '/favorite',
}

export enum ServerReplyCode {
  Success = 200,
  Unauthorized = 401,
  NoContent = 204,
}
