import { AuthorizationStatus, SortingType } from '../const';
import { AuthInfo } from './auth-info';
import { Offer, Offers } from './offers';
import { Reviews } from './reviews';

export type State = {
  city: string,
  offers: Offers | [],
  currentOffer: Offer | Record<string, never>,
  nearbyOffers: Offers | [],
  comments: Reviews | [],
  sorting: SortingType,
  authorizationStatus: AuthorizationStatus,
  user: AuthInfo | Record<string, never>,
  isDataLoaded: boolean,
}
