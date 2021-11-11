import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/state';
import { requireAuthorization, requireLogout, setUserAuthInfo } from '../action';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: {},
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    })
    .addCase(setUserAuthInfo, (state, action) => {
      state.user = action.payload;
    });
});

export { userData };
