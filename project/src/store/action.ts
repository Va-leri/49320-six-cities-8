import { AuthorizationStatus, SortingType } from '../const';
import { ActionType } from '../types/action';
import { Offers } from '../types/offers';

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

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
