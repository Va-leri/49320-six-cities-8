import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';

type LocationsListProps = {
  onCityClick: (city: string) => void,
  activeCity: string,
}

function LocationsList({ onCityClick, activeCity }: LocationsListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <Link className={`locations__item-link tabs__item ${activeCity === city ? ' tabs__item--active' : ''}`} to={AppRoute.MAIN} onClick={() => {
            onCityClick(city);
          }}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default LocationsList;
