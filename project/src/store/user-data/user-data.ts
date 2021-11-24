import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/state';
import { requireAuthorization, requireLogout, setUserAuthInfo } from '../action';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {},
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(setUserAuthInfo, (state, action) => {
      state.user = action.payload;
    });
});

export { userData };
