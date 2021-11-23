import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { AnyAction } from 'redux';
import { AuthorizationStatus, CITIES, SortingType } from '../../const';
import { makeOffers } from '../../utils/mocks';
import MainScreen from './main-screen';
import userEvent from '@testing-library/user-event';
import { changeCity } from '../../store/action';

const history = createMemoryHistory();
const mockStore = configureMockStore<State, AnyAction>();

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const fakeOffers = makeOffers(10);
    const fakeOffersForParis = fakeOffers.map((offer) => ({
      ...offer,
      city: {
        ...offer.city,
        name: 'Paris',
      },
    }));

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        offers: fakeOffersForParis,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          email: 'email@mail.ru',
        },
      },
      SERVICE: {
        city: CITIES[0],
        sorting: SortingType.Popular,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <MainScreen />
        </Router>
      </Provider>);


    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('locations-list')).toBeInTheDocument();
    expect(screen.getAllByTestId(/place-card/i)).toHaveLength(fakeOffers.length);

    const citiesLinks = screen.getAllByTestId(/locations__item/i);
    userEvent.click(citiesLinks[1]);
    expect(store.getActions())
      .toEqual([
        changeCity(CITIES[1]),
      ]);
  });

  it('should render correctly when there are no offers', () => {
    const cityName = CITIES[0];

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        offers: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          email: 'email@mail.ru',
        },
      },
      SERVICE: {
        city: cityName,
        sorting: SortingType.Popular,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <MainScreen />
        </Router>
      </Provider>);

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId(/place-card/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('locations-list')).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${cityName}`)).toBeInTheDocument();
  });

  it('should render LoadingScreen when offers are not loaded', () => {
    const store = mockStore({
      DATA: {
        isDataLoaded: false,
        offers: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          email: 'email@mail.ru',
        },
      },
      SERVICE: {
        city: CITIES[0],
        sorting: SortingType.Popular,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <MainScreen />
        </Router>
      </Provider>);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('locations-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId(/place-card/i)).not.toBeInTheDocument();
  });
});

