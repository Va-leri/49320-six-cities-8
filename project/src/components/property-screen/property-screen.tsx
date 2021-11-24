import { useEffect } from 'react';
import { useParams } from 'react-router';
import { AppRoute } from '../../const';
import Header from '../header/header';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PlaceCard from '../place-card/place-card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchNearbyOffersAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import { requireDataUnload } from '../../store/action';
import { getCurrentOffer, getNearbyOffers, getIsDataLoaded } from '../../store/service-data/selectors';
import Property from '../property/property';

type Params = {
  id: string,
}

function PropertyScreen(): JSX.Element {
  const dispatch = useDispatch();

  const { id: currentId }: Params = useParams();

  const currentOffer = useSelector(getCurrentOffer);
  const nearbyOffers = useSelector(getNearbyOffers);
  const isDataLoaded = useSelector(getIsDataLoaded);

  useEffect(() => {
    dispatch(requireDataUnload());
    dispatch(fetchCurrentOfferAction(+currentId));
    dispatch(fetchNearbyOffersAction(+currentId));
    dispatch(fetchCommentsAction(+currentId));
  }, [currentId]);


  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  if (!('id' in currentOffer)) {
    return <NotFoundScreen />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <Property />
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                nearbyOffers.map((item) => (
                  <PlaceCard offer={item} screen={AppRoute.Room} key={item.id} />
                ))
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyScreen;
