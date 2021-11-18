import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { MAX_RATING } from '../../const';
import { CommentPost } from '../../types/comment';

type ReviewProps = {
  onFormSubmit: (review: CommentPost) => void,
}

function ReviewForm({ onFormSubmit }: ReviewProps): JSX.Element {
  const initialState: CommentPost = {
    rating: 0,
    comment: '',
  };
  const [review, setReview] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onFormSubmit(review);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array(MAX_RATING).fill('').map((_item, id) => {
          const rating = MAX_RATING - id;

          return (
            <Fragment key={rating}>
              <input className="form__rating-input visually-hidden" name="rating" value={rating} id={`${rating}-stars`} type="radio" onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                if (!evt.target.checked) {
                  return;
                }
                const value = parseInt(evt.target.value, 10);

                setReview({ ...review, rating: value });
                setIsDisabled(review.comment.length < 50 || review.comment.length > 300 || value === 0);
              }}
              />
              <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}

      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
        const value = evt.target.value;

        setReview({ ...review, comment: value });
        setIsDisabled(value.length < 50 || review.rating === 0);
      }}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" disabled={isDisabled} type="submit" >Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
