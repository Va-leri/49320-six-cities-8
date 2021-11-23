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

jest.mock('../main-screen/main-screen');
jest.mock('../property-screen/property-screen');
jest.mock('../favorites-screen/favorites-screen');

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={mockStore()}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText(/Main screen component/i)).toBeInTheDocument();
  });

  it('should render "PropertyScreen" when user navigate to "/offer/:id"', () => {
    history.push(AppRoute.Room);

    render(
      <Provider store={mockStore()}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText(/Property screen component/i)).toBeInTheDocument();
  });

  it('should render "FavoriteScreen" when user navigate to "/favorites" and authorizationStatus is "Authorized"', () => {
    history.push(AppRoute.Favorites);

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText(/Favorite screen component/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
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

    history.push(AppRoute.SignIn);
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
        authorizationStatus: AuthorizationStatus.NoAuth,
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
