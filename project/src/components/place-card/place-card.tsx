import { AppRoute, MAX_RATING } from '../../const';
import { Offer } from '../../types/offers';
import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { fetchFavoriteAction, fetchFavoriteOffersAction, fetchNearbyOffersAction } from '../../store/api-actions';
import { useDispatch } from 'react-redux';

type PlaceCardProps = {
  offer: Offer,
  screen: string,
  onPlaceCardHover?: (id: number) => void;
};

const getCardClassName = (path: string) => {
  switch (path) {
    case AppRoute.MAIN:
      return 'cities__place-card';
    case AppRoute.FAVORITES:
      return 'favorites__card';
    case AppRoute.ROOM:
      return 'near-places__card';
    default:
      return '';
  }
};

const getImageWrapperClassName = (path: string) => {
  switch (path) {
    case AppRoute.MAIN:
      return 'cities__image-wrapper';
    case AppRoute.FAVORITES:
      return 'favorites__image-wrapper';
    case AppRoute.ROOM:
      return 'near-places__image-wrapper';
    default:
      return '';
  }
};

const getImageSize = (path: string) => {
  switch (path) {
    case AppRoute.FAVORITES:
      return {
        width: 150,
        height: 110,
      };
    default:
      return {
        width: 260,
        height: 200,
      };
  }
};

function PlaceCard({ offer, screen, onPlaceCardHover }: PlaceCardProps): JSX.Element {
  const dispatch = useDispatch();

  function placeCardHoverHandler(evt: MouseEvent<HTMLElement>) {
    if (!onPlaceCardHover) {
      return;
    }
    const id = +evt.currentTarget.id;
    onPlaceCardHover(id);
  }

  const {
    id,
    isFavorite,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  const ratingRounded = Math.round(rating);

  const imageSizes = getImageSize(screen);

  const onBookmarkBtnClick = () => {
    dispatch(fetchFavoriteAction(id, isFavorite));
    dispatch(fetchFavoriteOffersAction());
    if (screen === AppRoute.ROOM) {
      dispatch(fetchNearbyOffersAction(id));
    }
  };

  return (
    <article className={`${getCardClassName(screen)} place-card`} id={id.toString()} onMouseEnter={placeCardHoverHandler}>
      {
        isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : ''
      }

      <div className={`${getImageWrapperClassName(screen)} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={imageSizes.width} height={imageSizes.height} alt="Place image" />
        </Link>
      </div>
      <div className={`${isFavorite ? 'favorites__card-info ' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button" onClick={onBookmarkBtnClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingRounded * 100 / MAX_RATING}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
