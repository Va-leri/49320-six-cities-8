import { CommentsGet } from '../../types/comment';
import { Offer, Offers } from '../../types/offers';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getOffers = (state: State): Offers => state[NameSpace.data].offers;

export const getCurrentOffer = (state: State): Offer => state[NameSpace.data].currentOffer;

export const getNearbyOffers = (state: State): Offers => state[NameSpace.data].nearbyOffers;

export const getComments = (state: State): CommentsGet => state[NameSpace.data].comments;

export const getIsDataLoaded = (state: State): boolean => state[NameSpace.data].isDataLoaded;


