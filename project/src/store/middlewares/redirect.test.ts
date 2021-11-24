import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { AppRoute } from '../../const';
import { State } from '../../types/state';
import { redirectToRout } from '../action';
import { redirect } from './redirect';

const fakeHistory = {
  location: { pathname: '' },
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login if action.type === "service/redirectToRout" and action.payload === "/login"', () => {
    store.dispatch(redirectToRout(AppRoute.SignIn));
    expect(fakeHistory.location.pathname).toBe(AppRoute.SignIn);
    expect(store.getActions())
      .toEqual([
        redirectToRout(AppRoute.SignIn),
      ]);
  });

  it('should not to be redirect /favorites because bad action', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: AppRoute.Favorites });
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Favorites);
  });
});
