import { AuthInfo } from '../types/auth-info';
import { AuthInfoFromServer, CommentFromServer, OfferFromServer, OffersFromServer, UserFromServer } from '../types/data-from-server';
import { Offer, Offers } from '../types/offers';
import { Review } from '../types/reviews';
import { User } from '../types/user';

export const adaptUserToClient = (userFromServer: UserFromServer): User => ({
  ...userFromServer,
  avatarUrl: userFromServer.avatar_url,
  isPro: userFromServer.is_pro,
});

export const adaptOfferToClient = (offer: OfferFromServer): Offer => ({
  ...offer,
  isFavorite: offer['is_favorite'],
  isPremium: offer['is_premium'],
  maxAdults: offer['max_adults'],
  previewImage: offer['preview_image'],
  host: adaptUserToClient(offer.host),
});

export const adaptOffersToClient = (offers: OffersFromServer): Offers => (
  offers.map((offer) => adaptOfferToClient(offer))
);

export const adaptCommentToClient = (comment: CommentFromServer): Review => ({
  ...comment,
  user: adaptUserToClient(comment.user),
  date: new Date(comment.date),
});

export const adaptAuthInfoToClient = (authInfo: AuthInfoFromServer): AuthInfo => {
  const { email, token, ...user } = authInfo;
  const adaptedUser = adaptUserToClient(user);
  return {
    email,
    token,
    ...adaptedUser,
  };
};
