import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { requireDataUnload } from '../../store/action';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { getFavoriteOffers, getIsDataLoaded } from '../../store/service-data/selectors';
import { getUniqueItems } from '../../utils/common';
import FavoriteLocationItem from '../favorite-location-item/favorite-location-item';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';


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

                {citiesUnique.map((city) => <FavoriteLocationItem city={city} offers={favoriteOffers} key={city} />)}

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
        <Link to={AppRoute.Main} className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div >
  );
}

export default FavoritesScreen;
