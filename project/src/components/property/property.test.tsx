import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeCommentsGet, makeOffer, makeOffers } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import Property from './property';
import userEvent from '@testing-library/user-event';
import { changeFavoriteStatus, loadCurrentOffer } from '../../store/action';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const fakeOffer = makeOffer();
const nearbyOffers = makeOffers(3);
const FAKE_EMAIL = 'email@mail.ru';
fakeOffer.id = 1;

jest.mock('../../store/api-actions', () => {
  const originalModule = jest.requireActual('../../store/api-actions');

  return {
    __esModule: true,
    ...originalModule,
    fetchFavoriteAction: () => ({
      type: 'data/changeFavoriteStatus',
      payload: { id: 1, isFavorite: false },
    }),
    fetchCurrentOfferAction: () => ({
      type: 'data/loadCurrentOffer',
      payload: {},
    }),
  };
});


describe('Component: Property', () => {
  it('should render correctly when user is authorized', () => {
    fakeOffer.isPremium = true;

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
          <Property />
        </Router>
      </Provider>);

    expect(screen.getByAltText(/Photo studio/i)).toBeInTheDocument();
    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeOffer.price.toString(), 'i'))).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.type)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();
  });

  it('should render correctly when user is unauthorized', () => {
    fakeOffer.isPremium = false;

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
          <Property />
        </Router>
      </Provider>);

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByAltText(/Photo studio/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeOffer.price.toString(), 'i'))).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.type)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should dispatch LoadFavoriteOffers and loadCurrentOffer on bookmark button click', () => {
    fakeOffer.isPremium = true;

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
          <Property />
        </Router>
      </Provider>);

    fakeOffer.isFavorite = !fakeOffer.isFavorite;

    userEvent.click(screen.getByTestId('bookmark-button'));
    expect(store.getActions())
      .toEqual([
        changeFavoriteStatus({ id: 1, isFavorite: false }),
        loadCurrentOffer({}),
      ]);
  });
});
