export enum AppRoute {
  MAIN = '/',
  SIGN_IN = '/login',
  FAVORITES = '/favorites',
  ROOM = '/offer/:id',
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
  POPULAR = 'Popular',
  PRICE_ASC = 'Price low to high',
  PRICE_DESC = 'Price high to low',
  RATING_DESC = 'Top rated first',
}

export enum AuthorizationStatus {
  AUTH = 'Authorized',
  NO_AUTH = 'Unauthorized',
  UNKNOWN = 'Unknown',
}

export enum APIRoute {
  OFFERS = '/hotels',
  LOGIN = '/login',
  LOGOUT = '/logout',
  COMMENTS = '/comments',
  NEARBY = '/nearby',
  FAVORITES = '/favorite',
}

export enum ServerReplyCode {
  Success = 200,
  Unauthorized = 401,
  NoContent = 204,
}
