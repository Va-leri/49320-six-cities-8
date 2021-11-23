import { Fragment } from 'react';
import { AppRoute, SortingType } from '../../const';
import { Offer, Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offers;
  screen: AppRoute,
  sortingType: SortingType,
  onListItemHover: (id: number) => void | null,
};

const getSortedOffers = (offers: Offers, sortingType: SortingType): Offers => {
  switch (sortingType) {
    case SortingType.Popular:
      return offers;
    case SortingType.PriceAsc:
      return offers.slice().sort((offer1, offer2) => offer1.price - offer2.price);
    case SortingType.PriceDesc:
      return offers.slice().sort((offer1, offer2) => offer2.price - offer1.price);
    case SortingType.RatingDesc:
      return offers.slice().sort((offer1, offer2) => offer2.rating - offer1.rating);
    default:
      return offers;
  }
};

function PlacesList(props: PlacesListProps): JSX.Element {
  const { offers, screen, sortingType, onListItemHover } = props;
  const sortedOffers = getSortedOffers(offers, sortingType);

  return (
    <Fragment>
      {sortedOffers.map((item: Offer) => <PlaceCard offer={item} key={item.id} screen={screen} onPlaceCardHover={onListItemHover} />)}
    </Fragment>

  );
}

export default PlacesList;
