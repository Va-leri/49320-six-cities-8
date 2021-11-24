import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { AppRoute, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import useMap from '../../hooks/use-map';
import { City, Point } from '../../types/offers';


type MapProps = {
  city: City,
  points: Point[],
  selectedPoint?: Point,
  screen: AppRoute,
}

function Map({ city, points, selectedPoint, screen }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
  });

  function getMapClassName(path: AppRoute) {
    switch (path) {
      case AppRoute.Main:
        return 'cities__map';
      case AppRoute.Room:
        return 'property__map';
      default:
        return '';
    }
  }

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const isSelected = selectedPoint?.id === point.id;

        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: isSelected ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return (
    <section className={`${getMapClassName(screen)} map`} ref={mapRef} data-testid="map">
    </section>
  );
}

export default Map;
