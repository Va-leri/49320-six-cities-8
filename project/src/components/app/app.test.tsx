import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeCityName, makeOffers } from '../../utils/mocks';
import App from './app';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('Application Routing', () => {
  it('should render "LoginScreen" when user navigate to "/login"', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {},
      },
      DATA: {
        isDataLoaded: true,
        favoriteOffers: makeOffers(4),
      },
      SERVICE: {
        city: makeCityName(),
      },
    });

    history.push(AppRoute.SIGN_IN);
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getAllByText(/sign in/i)).toHaveLength(3);
    expect(screen.getByPlaceholderText(/mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {},
      },
    });

    history.push('/non-existent-route');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText(/404 Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Back To Main/i)).toBeInTheDocument();
  });
});
