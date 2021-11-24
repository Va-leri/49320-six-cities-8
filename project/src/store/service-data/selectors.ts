import { CommentsGet } from '../../types/comment';
import { Offer, Offers } from '../../types/offers';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;

export const getCurrentOffer = (state: State): Offer => state[NameSpace.Data].currentOffer;

export const getFavoriteOffers = (state: State): Offers => state[NameSpace.Data].favoriteOffers;

export const getNearbyOffers = (state: State): Offers => state[NameSpace.Data].nearbyOffers;

export const getComments = (state: State): CommentsGet => state[NameSpace.Data].comments;

export const getIsDataLoaded = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

export const getIsLoading = (state: State): boolean => state[NameSpace.Data].isLoading;
