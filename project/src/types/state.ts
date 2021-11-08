import { AuthorizationStatus, SortingType } from '../const';
import { Offer, Offers } from './offers';
import { Reviews } from './reviews';

export type State = {
  city: string,
  offers: Offers,
  currentOffer: Offer | Record<string, never>,
  comments: Reviews,
  sorting: SortingType,
  authorizationStatus: AuthorizationStatus,
  login: string,
  isDataLoaded: boolean,
}
