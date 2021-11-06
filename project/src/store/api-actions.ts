import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { ThunkActionResult } from '../types/action';
import { OffersFromServer } from '../types/data-from-server';
import { Offers } from '../types/offers';
import { loadOffers, redirectToRout, requireAuthorization } from './action';
import { AuthData } from '../types/auth-data';
import { saveToken, Token } from '../services/token';


const adaptOffersToClient = (offers: OffersFromServer): Offers => (
  offers.map((offer) => ({
    ...offer,
    isFavorite: offer['is_favorite'],
    isPremium: offer['is_premium'],
    maxAdults: offer['max_adults'],
    previewImage: offer['preview_image'],
    host: {
      ...offer['host'],
      avatarUrl: offer.host['avatar_url'],
      isPro: offer.host['is_pro'],
    },
  }))
);

export const fetchOffersAction = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const { data } = await api.get<OffersFromServer>(APIRoute.OFFERS);
  dispatch(loadOffers(adaptOffersToClient(data)));
};

export const checkAuthAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  await api.get(APIRoute.LOGIN)
    .then(() => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
    })
    .catch((error) => console.log(error));
};

export const loginAction = (data: AuthData): ThunkActionResult => async (dispatch, _getState, api) => {
  const { data: { token } } = await api.post<{ token: Token }>(APIRoute.LOGIN, data);
  saveToken(token);
  dispatch(requireAuthorization(AuthorizationStatus.AUTH));
  dispatch(redirectToRout(AppRoute.MAIN));
};
