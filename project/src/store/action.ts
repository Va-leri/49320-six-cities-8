import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, SortingType } from '../const';
import { ActionType } from '../types/action';
import { AuthInfo } from '../types/auth-info';
import { CommentsGet } from '../types/comment';
import { Offer, Offers } from '../types/offers';

export const changeCity = createAction<string>(ActionType.ChangeCity);

export const changeSorting = createAction<SortingType>(ActionType.ChangeSorting);

export const loadOffers = createAction<Offers>(ActionType.LoadOffers);

export const loadCurrentOffer = createAction<Offer>(ActionType.LoadCurrentOffer);

export const changeFavoriteStatus = createAction<{ id: number, isFavorite: boolean }>(ActionType.ChangeFavoriteStatus);

export const loadNearbyOffers = createAction<Offers>(ActionType.LoadNearbyOffers);

export const loadComments = createAction<CommentsGet>(ActionType.LoadComments);

export const requireDataUnload = createAction(ActionType.RequireDataUnload);

export const requireAuthorization = createAction<AuthorizationStatus>(ActionType.RequireAuthorization);

export const requireLogout = createAction(ActionType.RequireLogout);

export const redirectToRout = createAction<AppRoute>(ActionType.RedirectToRout);

export const setUserAuthInfo = createAction<AuthInfo | Record<string, never>>(ActionType.SetUserAuthInfo);
