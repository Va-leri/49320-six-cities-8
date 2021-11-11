import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import { AppRoute, AuthorizationStatus, MAX_RATING } from '../../const';
import Header from '../header/header';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PlaceCard from '../place-card/place-card';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkAppDispatch } from '../../types/action';
import { store } from '../../index';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchNearbyOffersAction, fetchReviewAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import { CommentPost } from '../../types/comment';
import { requireDataUnload } from '../../store/action';
import { getCurrentOffer, getNearbyOffers, getComments, getIsDataLoaded } from '../../store/service-data/selectors';
import { getAuthorizationStatus } from '../../store/user-data/services';

type Params = {
  id: string,
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onReviewSubmit(review: CommentPost) {
    dispatch(fetchReviewAction(review));
  },
});

const mapStateToProps = (state: State) => ({
  currentOffer: getCurrentOffer(state),
  nearbyOffers: getNearbyOffers(state),
  comments: getComments(state),
  authorizationStatus: getAuthorizationStatus(state),
  isDataLoaded: getIsDataLoaded(state),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function PropertyScreen({ currentOffer, nearbyOffers, comments, authorizationStatus, isDataLoaded, onReviewSubmit }: PropsFromRedux): JSX.Element {
  const { id: currentId }: Params = useParams();
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  useEffect(() => {
    store.dispatch(requireDataUnload());
    store.dispatch(fetchCurrentOfferAction(+currentId))
      .then(() => {
        store.dispatch(fetchNearbyOffersAction(+currentId));
        store.dispatch(fetchCommentsAction());
      });
  }, [currentId]);


  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  if (!('id' in currentOffer)) {
    return <NotFoundScreen />;
  }


  const city = currentOffer.city;
  const points = nearbyOffers.map(({ id, location }) => ({ id, location }));
  const currentPoint = {
    id: currentOffer.id,
    location: currentOffer.location,
  };
  points.push(currentPoint);
  const selectedPoint = currentPoint;

  const {
    bedrooms,
    description,
    goods,
    host,
    images,
    isFavorite,
    isPremium,
    maxAdults,
    price,
    rating,
    title,
    type,
  } = currentOffer;


  const ratingRounded = Math.round(rating);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  : ''
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${ratingRounded * 100 / MAX_RATING}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((item) => (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {
                    host.isPro ?
                      <span className="property__user-status">
                        Pro
                      </span>
                      : ''
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                {
                  comments[0] &&
                  <Fragment>
                    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>

                    <ReviewsList reviews={comments}></ReviewsList>
                  </Fragment>
                }
                {
                  isAuthorized &&
                  <ReviewForm onFormSubmit={onReviewSubmit} />
                }
              </section>
            </div>
          </div>

          <Map city={city} points={points} selectedPoint={selectedPoint} screen={AppRoute.ROOM}></Map>

        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                nearbyOffers.map((item) => (
                  <PlaceCard offer={item} screen={AppRoute.ROOM} key={item.id} />
                ))
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { PropertyScreen };
export default connector(PropertyScreen);
