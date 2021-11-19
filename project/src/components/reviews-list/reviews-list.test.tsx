import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { MAX_REVIEWS_ON_PAGE } from '../../const';
import { makeCommentsGet } from '../../utils/mocks';
import ReviewsList from './reviews-list';

const history = createMemoryHistory();

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const comments = makeCommentsGet(15);
    const commentsOnPage = comments.length > MAX_REVIEWS_ON_PAGE ? MAX_REVIEWS_ON_PAGE : comments.length;
    const sortedComments = comments.slice().sort((commentPrev, commentNext) => dayjs(commentNext.date).diff(dayjs(commentPrev.date))).slice(0, MAX_REVIEWS_ON_PAGE);

    render(
      <Router history={history} >
        <ReviewsList
          reviews={comments}
        />
      </Router>);

    expect(screen.getAllByAltText('Reviews avatar')).toHaveLength(commentsOnPage);
    expect(screen.getAllByTestId('review')[0]).toHaveTextContent(sortedComments[0].comment);
  });
});
