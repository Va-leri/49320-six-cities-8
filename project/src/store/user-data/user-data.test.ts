import { AuthorizationStatus } from '../../const';
import { makeUserAuthInfo } from '../../utils/mocks';
import { requireAuthorization, requireLogout, setUserAuthInfo } from '../action';
import { userData } from './user-data';

describe('Reducer: userData', () => {
  it('without additional parameters should return initial state', () => {
    expect(userData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.UNKNOWN,
        user: {},
      });
  });

  it('should set authorization status to AuthorizationStatus.NO_AUTH', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      user: {},
    };

    expect(userData(state, requireLogout()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {},
      });
  });

  it('should set authorization status to AuthorizationStatus.AUTH', () => {
    const authStatus = AuthorizationStatus.AUTH;
    const state = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      user: {},
    };

    expect(userData(state, requireAuthorization(authStatus)))
      .toEqual({
        ...state,
        authorizationStatus: AuthorizationStatus.AUTH,
      });
  });

  it('should set user to fakeUser', () => {
    const fakeUser = makeUserAuthInfo();
    const state = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
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
