import { AppRoute } from '../../const';
import { Offers, Point } from '../../types/offers';
import Header from '../header/header';
import PlacesList from '../places-list/places-list';
import Map from '../map/map';
import { useState } from 'react';
import LocationsList from '../locations-list/locations-list';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Actions } from '../../types/action';
import { changeCity } from '../../store/action';
import { State } from '../../types/state';

type MainProps = {
  offers: Offers,
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onCityClick: changeCity,
}, dispatch);

const mapStateToProps = ({ city, offers }: State) => ({
  city,
  offers,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainProps;

function MainScreen(props: ConnectedComponentProps): JSX.Element {
  const { offers, city, onCityClick } = props;
  // const city = offers[0].city;
  const points = offers.map(({ id, location }) => ({ id, location }));

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const onListItemHover = (id: string) => {
    const currentPoint = points.find((point) => point.id === id);

    if (currentPoint) {
      setSelectedPoint(currentPoint);
    }
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList onCityClick={onCityClick}></LocationsList>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
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
                <PlacesList offers={offers} screen={AppRoute.MAIN} onListItemHover={onListItemHover} />
              </div>

            </section>
            <div className="cities__right-section">
              <Map city={city} points={points} selectedPoint={selectedPoint} screen={AppRoute.MAIN}></Map>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
