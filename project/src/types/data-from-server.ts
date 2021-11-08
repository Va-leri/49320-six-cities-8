export type LocationFromServer = {
  'latitude': number,
  'longitude': number,
  'zoom': number,
};

export type CityFromServer = {
  'location': LocationFromServer,
  'name': string,
};

export type UserFromServer = {
  'avatar_url': string,
  'id': number,
  'is_pro': boolean,
  'name': string,
}

export type UsersFromServer = UserFromServer[];

export type OfferFromServer = {
  'bedrooms': number,
  'city': CityFromServer,
  'description': string,
  'goods': string[],
  'host': UserFromServer,
  'id': number,
  'images': string[],
  'is_favorite': boolean,
  'is_premium': boolean,
  'location': LocationFromServer,
  'max_adults': number,
  'preview_image': string,
  'price': number,
  'rating': number,
  'title': string,
  'type': string,
}

export type CommentFromServer = {
  'comment': string,
  'date': string,
  'id': number,
  'rating': number,
  'user': UserFromServer,
};

export type OffersFromServer = OfferFromServer[];
export type CommentsFromServer = CommentFromServer[];
