import { changeCity, loadComments, loadCurrentOffer, loadNearbyOffers, loadOffers, redirectToRout, requireAuthorization, requireDataUnload, requireLogout, setUserAuthInfo, changeSorting, changeFavoriteStatus } from '../store/action';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';
import { AxiosInstance } from 'axios';

export enum ActionType {
  ChangeCity = 'service/changeCity',
  ChangeSorting = 'service/changeSorting',
  RedirectToRout = 'service/redirectToRout',
  LoadOffers = 'data/loadOffers',
  LoadNearbyOffers = 'data/loadNearbyOffers',
  LoadComments = 'data/loadComments',
  LoadCurrentOffer = 'data/loadCurrentOffer',
  ChangeFavoriteStatus = 'data/changeFavoriteStatus',
  RequireDataUnload = 'data/requireDataUnload',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  SetUserAuthInfo = 'user/setUserAuthInfo',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof changeSorting>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof loadNearbyOffers>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof loadCurrentOffer>
  | ReturnType<typeof changeFavoriteStatus>
  | ReturnType<typeof requireDataUnload>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof setUserAuthInfo>
  | ReturnType<typeof redirectToRout>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
