import { CommentsGet } from '../../types/comment';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: CommentsGet,
}

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((item) => <ReviewItem review={item} key={item.id.toString()} />)}
    </ul>
  );
}

export default ReviewsList;
