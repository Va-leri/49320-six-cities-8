import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './header';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeUserAuthInfo } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('should render correctly when user is authorized', () => {
    const fakeUser = makeUserAuthInfo();

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUser,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <Header />
        </Router>
      </Provider>);

    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    expect(screen.getByText(fakeUser.email)).toBeInTheDocument();
  });

  it('should render correctly when user is NOT authorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: {},
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <Header />
        </Router>
      </Provider>);

    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).toBeInTheDocument();
  });
});
