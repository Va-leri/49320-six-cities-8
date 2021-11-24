import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { lorem } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AnyAction } from 'redux';
import { MAX_RATING, ReviewLength } from '../../const';
import { State } from '../../types/state';
import ReviewForm from './review-form';

const history = createMemoryHistory();
const mockStore = configureMockStore<State, AnyAction>();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const fakeReview = lorem.paragraph();
    const fakeSubmitHandler = jest.fn();
    const FAKE_RATING = 3;

    const store = mockStore({
      DATA: {
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <ReviewForm
            onFormSubmit={fakeSubmitHandler}
          />
        </Router>
      </Provider>);

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

    userEvent.click(screen.getByTestId(`rating-label-${FAKE_RATING}`));
    expect(screen.getByTestId(`rating-input-${FAKE_RATING}`)).toBeChecked();

    userEvent.click(submitBtn);
    expect(fakeSubmitHandler).toBeCalledTimes(1);
    expect(fakeSubmitHandler).toBeCalledWith({
      rating: FAKE_RATING,
      comment: fakeReview,
    });
  });

  it('should not be submitted if rating is empty or review length is outside the limits', () => {
    const fakeSubmitHandler = jest.fn();
    let fakeReview = lorem.paragraph();
    let FAKE_RATING = 0;

    const store = mockStore({
      DATA: {
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <ReviewForm
            onFormSubmit={fakeSubmitHandler}
          />
        </Router>
      </Provider>);

    const reviewField = screen.getByTestId('review');
    const submitBtn = screen.getByRole('button');

    userEvent.type(reviewField, fakeReview);

    userEvent.click(submitBtn);
    expect(fakeSubmitHandler).toBeCalledTimes(0);

    fakeReview = lorem.sentences(10);
    FAKE_RATING = 3;

    userEvent.type(reviewField, fakeReview);
    userEvent.click(screen.getByTestId(`rating-label-${FAKE_RATING}`));

    userEvent.click(submitBtn);
    expect(fakeSubmitHandler).toBeCalledTimes(0);

    fakeReview = lorem.word(10);
    FAKE_RATING = 3;

    userEvent.type(reviewField, fakeReview);
    userEvent.click(screen.getByTestId(`rating-label-${FAKE_RATING}`));

    userEvent.click(submitBtn);
    expect(fakeSubmitHandler).toBeCalledTimes(0);
  });
});
