import { AppRoute } from '../../const';
import { Offers, Point } from '../../types/offers';
import PlacesList from '../places-list/places-list';

type PlacesProps = {
  points: Point[],
  cityName: string,
  filteredOffers: Offers,
  onListItemHover: (id: string) => void,
}

function Places({ points, cityName, filteredOffers, onListItemHover }: PlacesProps): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{points.length} places to stay in {cityName}</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
          Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="/icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom">
          <li className="places__option places__option--active" tabIndex={0}>Popular</li>
          <li className="places__option" tabIndex={0}>Price: low to high</li>
          <li className="places__option" tabIndex={0}>Price: high to low</li>
          <li className="places__option" tabIndex={0}>Top rated first</li>
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        <PlacesList offers={filteredOffers} screen={AppRoute.MAIN} onListItemHover={onListItemHover} />
      </div>
    </section>
  );
}

export default Places;
