import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { MAX_RATING, ReviewLength, TitleToRatingValue } from '../../const';
import { getIsLoading } from '../../store/service-data/selectors';
import { CommentPost } from '../../types/comment';

type ReviewProps = {
  onFormSubmit: (review: CommentPost) => void,
}

function ReviewForm({ onFormSubmit }: ReviewProps): JSX.Element {
  const initialState: CommentPost = {
    rating: 0,
    comment: '',
  };

  const isLoading = useSelector(getIsLoading);

  const [review, setReview] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onFormSubmit(review);
    setReview(initialState);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array(MAX_RATING).fill('').map((_item, id) => {
          const rating = MAX_RATING - id;

          return (
            <Fragment key={rating}>
              <input className="form__rating-input visually-hidden" name="rating" value={rating} id={`${rating}-stars`} type="radio" data-testid={`rating-input-${rating}`} checked={review.rating === rating} disabled={isLoading} onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                if (!evt.target.checked) {
                  return;
                }
                const value = parseInt(evt.target.value, 10);

                setReview({ ...review, rating: value });
                setIsDisabled(review.comment.length < ReviewLength.MIN || review.comment.length > ReviewLength.MAX || value === 0);
              }}
              />
              <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title={TitleToRatingValue[rating]} data-testid={`rating-label-${rating}`}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}

      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" data-testid="review" value={review.comment} disabled={isLoading} onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
        const value = evt.target.value;

        setReview({ ...review, comment: value });
        setIsDisabled(value.length < ReviewLength.MIN || review.comment.length > ReviewLength.MAX || review.rating === 0);
      }}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ReviewLength.MIN} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" disabled={isDisabled || isLoading} type="submit" >Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
