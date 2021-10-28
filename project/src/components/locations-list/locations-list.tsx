import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import { ChangeCityAction } from '../../types/action';

type LocationsListProps = {
  onCityClick: ChangeCityAction,
}

function LocationsList({ onCityClick }: LocationsListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <Link className="locations__item-link tabs__item" to={AppRoute.MAIN} onClick={() => {
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
