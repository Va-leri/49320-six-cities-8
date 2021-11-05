import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offers } from '../../types/offers';
import { State } from '../../types/state';
import { getUniqueItems } from '../../utils';
import Header from '../header/header';
import PlaceCard from '../place-card/place-card';

type LocationItemProps = {
  city: string,
  offers: Offers,
};

const mapStateToProps = ({ offers }: State) => ({
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

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
          offers.slice().filter((offer) => offer.city.name === city && offer.isFavorite).map((offer) =>
            <PlaceCard offer={offer} key={offer.id} screen={AppRoute.FAVORITES} />)
        }
      </div>
    </li>
  );
}

function FavoritesScreen({ offers }: PropsFromRedux): JSX.Element {
  const favoriteOffers = offers.slice().filter(({ isFavorite }) => isFavorite);

  const cities = favoriteOffers.map(({ city }) => city.name);
  const citiesUnique = getUniqueItems(cities);

  return (

    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {citiesUnique.map((city) => <LocationItem city={city} offers={offers} key={city} />)}

            </ul>
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

export { FavoritesScreen };
export default connector(FavoritesScreen);
