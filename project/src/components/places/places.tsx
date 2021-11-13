import { useSelector } from 'react-redux';
import { AppRoute } from '../../const';
import { getSorting } from '../../store/service-process/selectors';
import { Offers, Point } from '../../types/offers';
import PlacesList from '../places-list/places-list';
import Sorting from '../sorting/sorting';

type PlacesProps = {
  points: Point[],
  cityName: string,
  filteredOffers: Offers,
  onListItemHover: (id: number) => void,
}


function Places({ points, cityName, filteredOffers, onListItemHover }: PlacesProps): JSX.Element {
  const sorting = useSelector(getSorting);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{points.length} places to stay in {cityName}</b>
      <Sorting sortingType={sorting} />
      <div className="cities__places-list places__list tabs__content">
        <PlacesList offers={filteredOffers} screen={AppRoute.MAIN} onListItemHover={onListItemHover} sortingType={sorting} />
      </div>
    </section>
  );
}

// export { Places };
// export default connector(Places);
export default Places;
