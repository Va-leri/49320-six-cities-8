import { AuthorizationStatus } from '../../const';
import { makeUserAuthInfo } from '../../utils/mocks';
import { requireAuthorization, requireLogout, setUserAuthInfo } from '../action';
import { userData } from './user-data';

describe('Reducer: userData', () => {
  it('without additional parameters should return initial state', () => {
    expect(userData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        user: {},
      });
  });

  it('should set authorization status to AuthorizationStatus.NO_AUTH', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: {},
    };

    expect(userData(state, requireLogout()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: {},
      });
  });

  it('should set authorization status to AuthorizationStatus.AUTH', () => {
    const authStatus = AuthorizationStatus.Auth;
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: {},
    };

    expect(userData(state, requireAuthorization(authStatus)))
      .toEqual({
        ...state,
        authorizationStatus: AuthorizationStatus.Auth,
      });
  });

  it('should set user to fakeUser', () => {
    const fakeUser = makeUserAuthInfo();
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: {},
    };

    expect(userData(state, setUserAuthInfo(fakeUser)))
      .toEqual({
        ...state,
        user: fakeUser,
      });
  });
});

export { };
