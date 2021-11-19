import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { makeUserAuthInfo } from '../../utils/mocks';
import User from './user';

const history = createMemoryHistory();

describe('Component: User', () => {
  it('should render correctly', () => {
    const fakeUser = makeUserAuthInfo();

    render(
      <Router history={history} >
        <User user={fakeUser} />
      </Router>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(fakeUser.email)).toBeInTheDocument();
  });
});
