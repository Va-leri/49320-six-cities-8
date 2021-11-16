import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { requireDataUnload } from '../../store/action';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { getFavoriteOffers, getIsDataLoaded } from '../../store/service-data/selectors';
import { Offers } from '../../types/offers';
import { getUniqueItems } from '../../utils';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import PlaceCard from '../place-card/place-card';

type LocationItemProps = {
  city: string,
  offers: Offers,
};


function LocationItem({ city, offers }: LocationItemProps): JSX.Element {

  return (
    <li className="favorites__locations-items" >
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {
          offers.slice().filter((offer) => offer.city.name).map((offer) =>
            <PlaceCard offer={offer} key={offer.id} screen={AppRoute.FAVORITES} />)
        }
      </div>
    </li>
  );
}

function FavoritesScreen(): JSX.Element {
  const dispatch = useDispatch();

  const isDataLoaded = useSelector(getIsDataLoaded);
  const favoriteOffers = useSelector(getFavoriteOffers);
  const areFavorites = Boolean(favoriteOffers.length);


  const cities = areFavorites ? favoriteOffers.map(({ city }) => city.name) : [];
  const citiesUnique = areFavorites ? getUniqueItems(cities) : [];

  useEffect(() => {
    dispatch(requireDataUnload());
    dispatch(fetchFavoriteOffersAction());
  }, []);


  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className={`page ${!areFavorites ? 'page--favorites-empty' : ''}`}>
      <Header />

      <main className={`page__main page__main--favorites ${!areFavorites ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${!areFavorites ? 'favorites--empty' : ''}`}>
            {
              areFavorites ?
                <h1 className="favorites__title">Saved listing</h1> :
                <h1 className="visually-hidden">Favorites (empty)</h1>
            }
            {
              areFavorites &&
              <ul className="favorites__list">

                {citiesUnique.map((city) => <LocationItem city={city} offers={favoriteOffers} key={city} />)}

              </ul>
            }
            {
              !areFavorites &&
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            }
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoute.MAIN} className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div >
  );
}

export default FavoritesScreen;
