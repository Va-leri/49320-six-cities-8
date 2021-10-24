import React, { Fragment } from 'react';
import { useState } from 'react';
import { Offer, Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offers;
  screen: string,
  onListItemHover: (id: string) => void | null,
};

function PlacesList(props: PlacesListProps): JSX.Element {
  const { offers, screen, onListItemHover } = props;

  const [activeCard, setActiveCard] = useState('');

  return (
    <Fragment>
      {offers.map((item: Offer) => <PlaceCard offer={item} key={item.id} screen={screen} onPlaceCardHover={onListItemHover} />)}
    </Fragment>

  );
}

export default PlacesList;
