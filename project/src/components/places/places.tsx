import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppRoute } from '../../const';
import { getSorting } from '../../store/service-process/selectors';
import { Offers } from '../../types/offers';
import PlacesList from '../places-list/places-list';
import Sorting from '../sorting/sorting';

type PlacesProps = {
  cityName: string,
  filteredOffers: Offers,
  onListItemHover: (id: number) => void,
}


function Places({ cityName, filteredOffers, onListItemHover }: PlacesProps): JSX.Element {
  const sorting = useSelector(getSorting);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{filteredOffers.length} places to stay in {cityName}</b>
      <Sorting sortingType={sorting} />
      <div className="cities__places-list places__list tabs__content">
        <PlacesList offers={filteredOffers} screen={AppRoute.MAIN} onListItemHover={onListItemHover} sortingType={sorting} />
      </div>
    </section>
  );
}

export default memo(Places);
