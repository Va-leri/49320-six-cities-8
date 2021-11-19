import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { MAX_RATING, ReviewLength } from '../../const';
import ReviewForm from './review-form';

const history = createMemoryHistory();

describe('Component: User', () => {
  it('should render correctly', () => {

    render(
      <Router history={history} >
        <ReviewForm
          onFormSubmit={jest.fn()}
        />
      </Router>);

    expect(screen.getByTestId('review')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${ReviewLength.MIN} characters`, 'i'))).toBeInTheDocument();
    expect(screen.getAllByTestId('rating')).toHaveLength(MAX_RATING);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
