import { APIRoute, AuthorizationStatus } from '../const';
import { ThunkActionResult } from '../types/action';
import { OffersFromServer } from '../types/hotels';
import { Offers } from '../types/offers';
import { loadOffers, requireAuthorization } from './action';

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
    });
};

// export const loginAction = (): ThunkActionResult
