import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { AnyAction } from 'redux';
import { AuthorizationStatus } from '../../const';
import { makeCommentsGet, makeOffer, makeOffers } from '../../utils/mocks';
import PropertyScreen from './property-screen';
import { loadComments, loadCurrentOffer, loadNearbyOffers, requireDataUnload } from '../../store/action';

const history = createMemoryHistory();
const mockStore = configureMockStore<State, AnyAction>();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}));

jest.mock('../../store/api-actions', () => {
  const originalModule = jest.requireActual('../../store/api-actions');

  return {
    __esModule: true,
    ...originalModule,
    fetchCurrentOfferAction: () => ({
      type: 'data/loadCurrentOffer',
      payload: {},
    }),
    fetchNearbyOffersAction: () => ({
      type: 'data/loadNearbyOffers',
      payload: [],
    }),
    fetchCommentsAction: () => ({
      type: 'data/loadComments',
      payload: [],
    }),
  };
});

describe('Component: PropertyScreen', () => {
  it('should render LoadingScreen when property data is not loaded', () => {
    const store = mockStore({
      DATA: {
        isDataLoaded: false,
        currentOffer: undefined,
        nearbyOffers: [],
        comments: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          email: 'email@mail.ru',
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <PropertyScreen />
        </Router>
      </Provider>);

    expect(store.getActions())
      .toEqual([
        requireDataUnload(),
        loadCurrentOffer({}),
        loadNearbyOffers([]),
        loadComments([]),
      ]);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render correctly when there is no offer with current id', () => {
    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        currentOffer: {},
        nearbyOffers: [],
        comments: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          email: 'email@mail.ru',
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <PropertyScreen />
        </Router>
      </Provider>);

    expect(store.getActions())
      .toEqual([
        requireDataUnload(),
        loadCurrentOffer({}),
        loadNearbyOffers([]),
        loadComments([]),
      ]);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();
  });

  it('should render correctly when there are a current offer, nearby offers and comments', () => {
    const fakeOffer = makeOffer();
    fakeOffer.isPremium = true;

    const nearbyOffers = makeOffers(3);
    const FAKE_EMAIL = 'email@mail.ru';

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        currentOffer: fakeOffer,
        nearbyOffers: nearbyOffers,
        comments: makeCommentsGet(3),
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          email: FAKE_EMAIL,
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <PropertyScreen />
        </Router>
      </Provider>);

    expect(store.getActions())
      .toEqual([
        requireDataUnload(),
        loadCurrentOffer({}),
        loadNearbyOffers([]),
        loadComments([]),
      ]);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByText(/404 Page Not Found/i)).not.toBeInTheDocument();

    expect(screen.getByText(FAKE_EMAIL)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/place-card/i)).toHaveLength(nearbyOffers.length);

  });

  it('should render correctly when user is unauthorized', () => {
    const fakeOffer = makeOffer();
    fakeOffer.isPremium = true;

    const nearbyOffers = makeOffers(3);

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        currentOffer: fakeOffer,
        nearbyOffers: nearbyOffers,
        comments: makeCommentsGet(3),
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: {},
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <PropertyScreen />
        </Router>
      </Provider>);

    expect(store.getActions())
      .toEqual([
        requireDataUnload(),
        loadCurrentOffer({}),
        loadNearbyOffers([]),
        loadComments([]),
      ]);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByText(/404 Page Not Found/i)).not.toBeInTheDocument();

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/place-card/i)).toHaveLength(nearbyOffers.length);

  });
});

