import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { ThunkActionResult } from '../types/action';
import { AuthInfoFromServer, CommentsFromServer, OfferFromServer, OffersFromServer } from '../types/data-from-server';
import { changeCity, loadCurrentOffer, loadComments, redirectToRout, requireAuthorization, requireLogout, loadOffers, loadNearbyOffers, setUserAuthInfo } from './action';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { adaptAuthInfoToClient, adaptCommentToClient, adaptOffersToClient, adaptOfferToClient } from '../adapter/adapter';
import { CommentPost } from '../types/comment';
import { getCurrentOffer } from './service-data/selectors';


export const fetchOffersAction = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<OffersFromServer>(APIRoute.OFFERS);
  dispatch(loadOffers(adaptOffersToClient(data)));
};

export const fetchCurrentOfferAction = (id: number): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  await api.get<OfferFromServer>(`${APIRoute.OFFERS}/${id}`)
    .then(({ data }) => {
      dispatch(loadCurrentOffer(adaptOfferToClient(data)));
      const city = data.city.name;
      dispatch(changeCity(city));
    })
    .catch(() => {
      dispatch(loadCurrentOffer({}));
    });
};

export const fetchNearbyOffersAction = (id: number): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<OffersFromServer>(`${APIRoute.OFFERS}/${id}${APIRoute.NEARBY}`);
  dispatch(loadNearbyOffers(adaptOffersToClient(data)));
};

export const checkAuthAction = (): ThunkActionResult => async (dispatch, getState, api) => {
  await api.get(APIRoute.LOGIN)
    .then(({ data }) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(setUserAuthInfo(data));
    })
    .catch((error) => {
      dispatch(requireLogout());
      // console.log(error);
    });
};

export const loginAction = (authData: AuthData): ThunkActionResult => async (dispatch, _getState, api) => {
  const { data } = await api.post<AuthInfoFromServer>(APIRoute.LOGIN, authData);
  saveToken(data.token);
  dispatch(requireAuthorization(AuthorizationStatus.AUTH));
  dispatch(setUserAuthInfo(adaptAuthInfoToClient(data)));
  dispatch(redirectToRout(AppRoute.MAIN));
};

export const logoutAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  api.delete(APIRoute.LOGOUT);
  dropToken();
  dispatch(requireLogout());
  dispatch(setUserAuthInfo({}));
};

export const fetchCommentsAction = (): ThunkActionResult => async (dispatch, getState, api): Promise<void> => {
  const objectId = getCurrentOffer(getState()).id;
  const { data } = await api.get<CommentsFromServer>(`${APIRoute.COMMENTS}/${objectId}`);
  dispatch(loadComments(data.map((item) => adaptCommentToClient(item))));
};

export const fetchReviewAction = (review: CommentPost): ThunkActionResult => async (dispatch, getState, api) => {
  const objectId = getCurrentOffer(getState()).id;
  const { data } = await api.post<CommentsFromServer>(`${APIRoute.COMMENTS}/${objectId}`, review);
  dispatch(loadComments(data.map((item) => adaptCommentToClient(item))));
};

