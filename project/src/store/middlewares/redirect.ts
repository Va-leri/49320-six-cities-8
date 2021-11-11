import { Middleware } from 'redux';
import browserHistory from '../../browser-history';
import { ActionType } from '../../types/action';
import { rootReducer } from '../root-reducer';
// import { reducer } from '../reducer';

type State = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, State> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === ActionType.RedirectToRout) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
