import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { DateFormat, humanizeDate } from '../../utils/common';
import { makeCommentGet } from '../../utils/mocks';
import ReviewItem from './review-item';

const history = createMemoryHistory();

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const fakeComment = makeCommentGet();
    const { user } = fakeComment;

    render(
      <Router history={history} >
        <ReviewItem review={fakeComment} />
      </Router>);

    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
    expect(screen.getByText(humanizeDate(fakeComment.date, DateFormat['MMMM YYYY']))).toBeInTheDocument();
  });
});
