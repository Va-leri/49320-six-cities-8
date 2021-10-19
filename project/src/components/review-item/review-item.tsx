import { Review } from '../../types/reviews';
import { MAX_RATING } from '../../const';

type ReviewProps = {
  review: Review,
}

function ReviewItem({ review }: ReviewProps): JSX.Element {
  const {
    comment,
    date,
    rating,
    user,
  } = review;

  const ratingRounded = Math.round(rating);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingRounded * 100 / MAX_RATING}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date.toString()}>April 2019</time>
      </div>
    </li>
  );
}

export default ReviewItem;
