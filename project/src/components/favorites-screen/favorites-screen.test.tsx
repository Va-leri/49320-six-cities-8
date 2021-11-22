import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FavoritesScreen from './favorites-screen';
import { State } from '../../types/state';
import { AnyAction } from 'redux';
import { AuthorizationStatus } from '../../const';
import { loadFavoriteOffers } from '../../store/action';
import { makeOffers } from '../../utils/mocks';
import { getUniqueItems } from '../../utils';

const history = createMemoryHistory();
const mockStore = configureMockStore<State, AnyAction>();


jest.mock('../../store/api-actions', () => {
  const originalModule = jest.requireActual('../../store/api-actions');

  return {
    __esModule: true,
    ...originalModule,
    fetchFavoriteOffersAction: () => ({
      type: 'data/loadFavoriteOffers',
      payload: [],
    }),
  };
});

describe('Component: FavoritesScreen', () => {
  it('should render correctly', () => {
    const fakeOffers = makeOffers(10);
    const cities = fakeOffers.map(({ city }) => city.name);
    const citiesUnique = getUniqueItems(cities);

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        favoriteOffers: fakeOffers,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          email: 'email@mail.ru',
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <FavoritesScreen />
        </Router>
      </Provider>);

    expect(store.getActions())
      .toContainEqual(
        loadFavoriteOffers([]));

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.queryByText('Nothing yet saved.')).not.toBeInTheDocument();
    expect(screen.getAllByTestId(/location-item/i)).toHaveLength(citiesUnique.length);
    expect(screen.getAllByTestId(/place-card/i)).toHaveLength(fakeOffers.length);
  });

  it('should render correctly when there are no favorite offers', () => {
    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        favoriteOffers: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          email: 'email@mail.ru',
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <FavoritesScreen />
        </Router>
      </Provider>);

    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips/i)).toBeInTheDocument();
    expect(store.getActions())
      .toContainEqual(
        loadFavoriteOffers([]),
      );
  });

  it('should render LoadingScreen when favorite offers are not loaded', () => {
    const store = mockStore({
      DATA: {
        isDataLoaded: false,
        favoriteOffers: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          email: 'email@mail.ru',
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <FavoritesScreen />
        </Router>
      </Provider>);

    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
    expect(screen.queryByText('Nothing yet saved')).not.toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(store.getActions())
      .toContainEqual(
        loadFavoriteOffers([]),
      );
  });
});

