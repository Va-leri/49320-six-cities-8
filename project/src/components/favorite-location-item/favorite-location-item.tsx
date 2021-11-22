import { AppRoute } from '../../const';
import { Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type FavoriteLocationItemProps = {
  city: string,
  offers: Offers,
};


function FavoriteLocationItem({ city, offers }: FavoriteLocationItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items" data-testid={`location-item-${city}`}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {
          offers.slice().filter((offer) => offer.city.name === city).map((offer) =>
            <PlaceCard offer={offer} key={offer.id} screen={AppRoute.FAVORITES} />)
        }
      </div>
    </li>
  );
}

export default FavoriteLocationItem;
