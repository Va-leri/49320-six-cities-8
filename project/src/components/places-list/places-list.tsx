import React, { Fragment } from 'react';
import { SortingType } from '../../const';
// import { useState } from 'react';
import { Offer, Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offers;
  screen: string,
  sortingType: SortingType,
  onListItemHover: (id: number) => void | null,
};

const getSortedOffers = (offers: Offers, sortingType: SortingType): Offers => {
  switch (sortingType) {
    case SortingType.POPULAR:
      return offers;
    case SortingType.PRICE_ASC:
      return offers.slice().sort((offer1, offer2) => offer1.price - offer2.price);
    case SortingType.PRICE_DESC:
      return offers.slice().sort((offer1, offer2) => offer2.price - offer1.price);
    case SortingType.RATING_DESC:
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
