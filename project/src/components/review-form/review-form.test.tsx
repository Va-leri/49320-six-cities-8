import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { lorem } from 'faker';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { MAX_RATING, ReviewLength } from '../../const';
import ReviewForm from './review-form';

const history = createMemoryHistory();

describe('Component: User', () => {
  it('should render correctly', () => {
    const fakeReview = lorem.paragraph();
    const fakeSubmitHandler = jest.fn();
    const fakeRating = 3;

    render(
      <Router history={history} >
        <ReviewForm
          onFormSubmit={fakeSubmitHandler}
        />
      </Router>);

    const reviewField = screen.getByTestId('review');
    const ratingStars = screen.getAllByTestId(/rating-label/i);
    const ratingStarsInputs = screen.getAllByTestId(/rating-input/i);
    const submitBtn = screen.getByRole('button');

    expect(reviewField).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${ReviewLength.MIN} characters`, 'i'))).toBeInTheDocument();
    expect(ratingStars).toHaveLength(MAX_RATING);
    expect(ratingStarsInputs).toHaveLength(MAX_RATING);
    expect(submitBtn).toBeInTheDocument();

    userEvent.type(reviewField, fakeReview);
    expect(screen.getByDisplayValue(fakeReview)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(`rating-label-${fakeRating}`));
    expect(screen.getByTestId(`rating-input-${fakeRating}`)).toBeChecked();

    userEvent.click(submitBtn);
    expect(fakeSubmitHandler).toBeCalledTimes(1);
    expect(fakeSubmitHandler).toBeCalledWith({
      rating: fakeRating,
      comment: fakeReview,
    });
  });

  it('should not be submitted if rating is empty or review length is outside the limits', () => {
    const fakeSubmitHandler = jest.fn();
    let fakeReview = lorem.paragraph();
    let fakeRating = 0;

    render(
      <Router history={history} >
        <ReviewForm
          onFormSubmit={fakeSubmitHandler}
        />
      </Router>);

    const reviewField = screen.getByTestId('review');
    const submitBtn = screen.getByRole('button');

    userEvent.type(reviewField, fakeReview);

    userEvent.click(submitBtn);
    expect(fakeSubmitHandler).toBeCalledTimes(0);

    fakeReview = lorem.sentences(10);
    fakeRating = 3;

    userEvent.type(reviewField, fakeReview);
    userEvent.click(screen.getByTestId(`rating-label-${fakeRating}`));

    userEvent.click(submitBtn);
    expect(fakeSubmitHandler).toBeCalledTimes(0);

    fakeReview = lorem.word(10);
    fakeRating = 3;

    userEvent.type(reviewField, fakeReview);
    userEvent.click(screen.getByTestId(`rating-label-${fakeRating}`));

    userEvent.click(submitBtn);
    expect(fakeSubmitHandler).toBeCalledTimes(0);
  });
});
