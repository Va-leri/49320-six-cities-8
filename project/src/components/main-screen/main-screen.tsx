import Header from '../header/header';
import LocationsList from '../locations-list/locations-list';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../../store/action';
import LoadingScreen from '../loading-screen/loading-screen';
import { getCity } from '../../store/service-process/selectors';
import { getIsDataLoaded, getOffers } from '../../store/service-data/selectors';
import Cities from '../cities/cities';
import { useMemo } from 'react';


function MainScreen(): JSX.Element {
  const offers = useSelector(getOffers);
  const cityName = useSelector(getCity);
  const isDataLoaded = useSelector(getIsDataLoaded);

  const dispatch = useDispatch();

  const onCityClick = (city: string) => {
    dispatch(changeCity(city));
  };

  const filteredOffers = useMemo(() => offers.filter((offer) => {
    console.log('filtered offers');
    return offer.city.name === cityName;
  }), [cityName, offers]);

  const areFilteredOffers = Boolean(filteredOffers.length);

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
        <Cities areFilteredOffers={areFilteredOffers} filteredOffers={filteredOffers} cityName={cityName} />
      </main>
    </div>
  );
}

export default MainScreen;
