import { Offer } from './offers';
import { UserFromServer } from './user';

type Hotel = Omit<Offer, 'isFavorite' | 'isPremium' | 'maxAdults' | 'previewImage' | 'host'>;

type OfferFromServer = Hotel & {
  'is_favorite': boolean,
  'is_premium': boolean,
  'max_adults': number,
  'preview_image': string,
  'host': UserFromServer,
}

export type OffersFromServer = OfferFromServer[];
