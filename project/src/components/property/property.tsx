import { Fragment } from 'react';
import { AppRoute, AuthorizationStatus, MAX_RATING } from '../../const';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentOfferAction, fetchFavoriteAction, fetchReviewAction } from '../../store/api-actions';
import { CommentPost } from '../../types/comment';
import { getCurrentOffer, getNearbyOffers, getComments } from '../../store/service-data/selectors';
import { getAuthorizationStatus } from '../../store/user-data/selectors';

function Property(): JSX.Element {
  const dispatch = useDispatch();

  const currentOffer = useSelector(getCurrentOffer);
  const comments = useSelector(getComments);
  const nearbyOffers = useSelector(getNearbyOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const currentId = currentOffer.id;

  const onBookmarkBtnClick = () => {
    dispatch(fetchFavoriteAction(currentId, isFavorite));
    dispatch(fetchCurrentOfferAction(currentId));
  };
  const onReviewSubmit = (review: CommentPost) => {
    dispatch(fetchReviewAction(review));
  };

  const city = currentOffer.city;
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


  const points = nearbyOffers.map(({ id, location }) => ({ id, location }));
  const currentPoint = {
    id: currentOffer.id,
    location: currentOffer.location,
  };
  points.push(currentPoint);
  const selectedPoint = currentPoint;

  const ratingRounded = Math.round(rating);

  return (
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
            isPremium &&
            <div className="property__mark">
              <span>Premium</span>
            </div>

          }
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {title}
            </h1>
            <button className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''} button`} type="button" data-testid="bookmark-button" onClick={onBookmarkBtnClick}>
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
            <span className="property__rating-value rating__value">{rating}</span>
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
              <div className={`property__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
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
  );
}

export default Property;
