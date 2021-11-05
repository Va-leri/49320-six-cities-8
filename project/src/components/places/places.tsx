import { connect, ConnectedProps } from 'react-redux';
import { AppRoute } from '../../const';
import { Offers, Point } from '../../types/offers';
import { State } from '../../types/state';
import PlacesList from '../places-list/places-list';
import Sorting from '../sorting/sorting';

type PlacesProps = {
  points: Point[],
  cityName: string,
  filteredOffers: Offers,
  onListItemHover: (id: number) => void,
}

const mapStateToProps = ({ sorting }: State) => ({
  sorting,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PlacesProps;

function Places({ points, cityName, filteredOffers, onListItemHover, sorting }: ConnectedComponentProps): JSX.Element {
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

export { Places };
export default connector(Places);
