export const AppRoute = {
  MAIN: '/',
  SIGN_IN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id',
};

/* export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
}; */

export const MAX_RATING = 5;

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
}
