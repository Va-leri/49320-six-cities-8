import React, { Fragment } from 'react';
import { useState } from 'react';
import { Offer, Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offers;
  screen: string,
};

function PlacesList(props: PlacesListProps): JSX.Element {
  const { offers, screen } = props;

  const [activeCard, setActiveCard] = useState('');

  return (
    <Fragment>
      {offers.map((item: Offer) => <PlaceCard offer={item} key={item.id} screen={screen} />)}
    </Fragment>

  );
}

export default PlacesList;
