import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { ThunkActionResult } from '../types/action';
import { AuthInfoFromServer, CommentsFromServer, OfferFromServer, OffersFromServer } from '../types/data-from-server';
import { changeCity, loadCurrentOffer, loadComments, redirectToRout, requireAuthorization, requireLogout, loadOffers, loadNearbyOffers, setUserAuthInfo, changeFavoriteStatus, loadFavoriteOffers, setLoading } from './action';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { adaptAuthInfoToClient, adaptCommentToClient, adaptOffersToClient, adaptOfferToClient } from '../adapter/adapter';
import { CommentPost } from '../types/comment';
import { getCurrentOffer } from './service-data/selectors';
import { getAuthorizationStatus } from './user-data/selectors';
import { toast } from 'react-toastify';

const AUTH_FAIL_MESSAGE = 'Something went wrong. Please try again later';


export const checkAuthAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  await api.get(APIRoute.Login)
    .then(({ data }) => {
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserAuthInfo(data));
    })
    .catch((error) => {
      dispatch(requireLogout());
      dispatch(setUserAuthInfo({}));
    });
};

export const loginAction = (authData: AuthData): ThunkActionResult => async (dispatch, _getState, api) => {
  const { data } = await api.post<AuthInfoFromServer>(APIRoute.Login, authData);
  saveToken(data.token);
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
  dispatch(setUserAuthInfo(adaptAuthInfoToClient(data)));
  dispatch(redirectToRout(AppRoute.Main));
};

export const logoutAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireLogout());
  dispatch(setUserAuthInfo({}));
};

export const fetchOffersAction = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<OffersFromServer>(APIRoute.Offers);
  dispatch(loadOffers(adaptOffersToClient(data)));
};

export const fetchCurrentOfferAction = (id: number): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  await api.get<OfferFromServer>(`${APIRoute.Offers}/${id}`)
    .then(({ data }) => {
      dispatch(loadCurrentOffer(adaptOfferToClient(data)));
      const city = data.city.name;
      dispatch(changeCity(city));
    })
    .catch(() => {
      dispatch(loadCurrentOffer({}));
    });
};

export const fetchFavoriteOffersAction = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<OffersFromServer>(APIRoute.Favorites);
  dispatch(loadFavoriteOffers(adaptOffersToClient(data)));
};

export const fetchNearbyOffersAction = (id: number): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<OffersFromServer>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
  dispatch(loadNearbyOffers(adaptOffersToClient(data)));
};

export const fetchCommentsAction = (objectId: number): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<CommentsFromServer>(`${APIRoute.Comments}/${objectId}`);
  dispatch(loadComments(data.map((item) => adaptCommentToClient(item))));
};

export const fetchReviewAction = (review: CommentPost): ThunkActionResult => async (dispatch, getState, api) => {
  const objectId = getCurrentOffer(getState()).id;
  try {
    dispatch(setLoading(true));
    const { data } = await api.post<CommentsFromServer>(`${APIRoute.Comments}/${objectId}`, review);
    dispatch(loadComments(data.map((item) => adaptCommentToClient(item))));
  }
  catch {
    toast.info(AUTH_FAIL_MESSAGE);
    dispatch(setLoading(false));
  }
};

export const fetchFavoriteAction = (objectId: number, wasFavorite: boolean): ThunkActionResult => async (dispatch, getState, api) => {
  const isAuthorized = getAuthorizationStatus(getState());
  if (isAuthorized === AuthorizationStatus.NoAuth) {
    dispatch(redirectToRout(AppRoute.SignIn));
  }

  const { data } = await api.post<OfferFromServer>(`${APIRoute.Favorites}/${objectId}/${Number(!wasFavorite)}`);
  const changedOffer = adaptOfferToClient(data);
  const { id, isFavorite } = changedOffer;
  dispatch(changeFavoriteStatus({ id, isFavorite }));
};

