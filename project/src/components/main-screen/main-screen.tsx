import { AppRoute } from '../../const';
import { Point } from '../../types/offers';
import Header from '../header/header';
import Map from '../map/map';
import { useState } from 'react';
import LocationsList from '../locations-list/locations-list';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { changeCity } from '../../store/action';
import { State } from '../../types/state';
import NoPlaces from '../no-places/no-plases';
import Places from '../places/places';
import LoadingScreen from '../loading-screen/loading-screen';
import { getCity } from '../../store/service-process/selectors';
import { getIsDataLoaded, getOffers } from '../../store/service-data/selectors';

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onCityClick: changeCity,
}, dispatch);

const mapStateToProps = (state: State) => ({
  city: getCity(state),
  offers: getOffers(state),
  isDataLoaded: getIsDataLoaded(state),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MainScreen({ offers, city: cityName, isDataLoaded, onCityClick }: PropsFromRedux): JSX.Element {
  const filteredOffers = offers.filter((offer) => offer.city.name === cityName);

  const areFilteredOffers = Boolean(filteredOffers.length);

  const city = areFilteredOffers ? filteredOffers[0].city : undefined;
  const points = areFilteredOffers ? filteredOffers.map(({ id, location }) => ({ id, location })) : [];

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const onListItemHover = (id: number) => {
    const currentPoint = points.find((point) => point.id === id);

    if (currentPoint) {
      setSelectedPoint(currentPoint);
    }
  };

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }


  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index ${!areFilteredOffers ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList onCityClick={onCityClick} activeCity={cityName}></LocationsList>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${!areFilteredOffers ? 'cities__places-container--empty' : ''}`}>

            {areFilteredOffers
              ? <Places points={points} cityName={cityName} filteredOffers={filteredOffers} onListItemHover={onListItemHover} />
              : <NoPlaces cityName={cityName} />}

            <div className="cities__right-section">
              {city &&
                <Map city={city} points={points} selectedPoint={selectedPoint} screen={AppRoute.MAIN}></Map>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { MainScreen };
export default connector(MainScreen);
