import dayjs from 'dayjs';
import { MAX_REVIEWS_ON_PAGE } from '../../const';
import { CommentsGet } from '../../types/comment';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: CommentsGet,
}

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const sortedReviews = reviews.slice().sort((reviewPrev, reviewNext) => dayjs(reviewNext.date).diff(dayjs(reviewPrev.date))).slice(0, MAX_REVIEWS_ON_PAGE);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((item) => <ReviewItem review={item} key={item.id.toString()} />)}
    </ul>
  );
}

export default ReviewsList;
