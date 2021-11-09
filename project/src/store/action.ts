import { AppRoute, AuthorizationStatus, SortingType } from '../const';
import { ActionType } from '../types/action';
import { AuthInfo } from '../types/auth-info';
import { Offers } from '../types/offers';
import { Reviews } from '../types/reviews';
import { State } from '../types/state';

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

export const updateSorting = (sorting: SortingType) => ({
  type: ActionType.ChangeSorting,
  payload: sorting,
} as const);

export const loadOffers = (offers: Offers) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const loadCurrentOffer = (offer: State['currentOffer']) => ({
  type: ActionType.LoadCurrentOffer,
  payload: offer,
}) as const;

export const loadNearbyOffers = (offers: Offers) => ({
  type: ActionType.LoadNearbyOffers,
  payload: offers,
} as const);

export const loadComments = (comments: Reviews) => ({
  type: ActionType.LoadComments,
  payload: comments,
} as const);

export const requireDataUnload = () => ({
  type: ActionType.RequireDataUnload,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRout = (url: AppRoute) => ({
  type: ActionType.RedirectToRout,
  payload: url,
} as const);

export const setUserAuthInfo = (data: AuthInfo | Record<string, never> = {}) => ({
  type: ActionType.SetUserAuthInfo,
  payload: data,
} as const);
