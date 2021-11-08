import { changeCity, loadComments, loadCurrentOffer, loadOffers, redirectToRout, requireAuthorization, requireLogout, setLogin, updateSorting } from '../store/action';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';
import { AxiosInstance } from 'axios';

export enum ActionType {
  ChangeCity = 'changeCity',
  ChangeSorting = 'changeSorting',
  LoadOffers = 'data/loadOffers',
  LoadComments = 'data/loadComments',
  LoadCurrentOffer = 'data/loadCurrentOffer',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  SetLogin = 'user/setLogin',
  RedirectToRout = 'redirectToRout',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof updateSorting>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof loadCurrentOffer>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof setLogin>
  | ReturnType<typeof redirectToRout>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
