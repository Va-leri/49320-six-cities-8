import { Middleware } from 'redux';
import browserHistory from '../../browser-history';
import { ActionType } from '../../types/action';
import { reducer } from '../reducer';

type State = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, State> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === ActionType.RedirectToRout) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
