import { useCallback, useMemo, useState } from 'react';
import { AppRoute } from '../../const';
import { Offers, Point } from '../../types/offers';
import NoPlaces from '../no-places/no-plases';
import Places from '../places/places';
import Map from '../map/map';

type CitiesProps = {
  areFilteredOffers: boolean,
  filteredOffers: Offers,
  cityName: string,
}

function Cities({ areFilteredOffers, filteredOffers, cityName }: CitiesProps): JSX.Element {
  const points = useMemo(() => areFilteredOffers ? filteredOffers.map(({ id, location }) => ({ id, location })) : [], [areFilteredOffers, filteredOffers]);
  const city = areFilteredOffers ? filteredOffers[0].city : undefined;


  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const onListItemHover = useCallback((id: number) => {
    const currentPoint = points.find((point) => point.id === id);

    if (currentPoint) {
      setSelectedPoint(currentPoint);
    }
  }, [points]);

  return (
    <div className="cities">
      <div className={`cities__places-container container ${!areFilteredOffers ? 'cities__places-container--empty' : ''}`}>

        {areFilteredOffers
          ? <Places cityName={cityName} filteredOffers={filteredOffers} onListItemHover={onListItemHover} />
          : <NoPlaces cityName={cityName} />}

        <div className="cities__right-section">
          {city &&
            <Map city={city} points={points} selectedPoint={selectedPoint} screen={AppRoute.MAIN}></Map>}
        </div>
      </div>
    </div>
  );
}

export default Cities;
