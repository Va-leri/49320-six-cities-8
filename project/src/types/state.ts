import { AuthorizationStatus, SortingType } from '../const';
import { RootState } from '../store/root-reducer';
import { AuthInfo } from './auth-info';
import { CommentsGet } from './comment';
import { Offer, Offers } from './offers';

export type UserData = {
  authorizationStatus: AuthorizationStatus,
  user: AuthInfo,
}

export type ServiceData = {
  offers: Offers,
  favoriteOffers: Offers,
  currentOffer: Offer,
  nearbyOffers: Offers,
  comments: CommentsGet,
  isDataLoaded: boolean,
}

export type ServiceProcess = {
  city: string,
  sorting: SortingType,
}


export type State = RootState;
