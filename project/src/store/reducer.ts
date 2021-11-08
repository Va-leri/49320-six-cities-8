import { AuthorizationStatus, CITIES, SortingType } from '../const';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';

const initialState = {
  city: CITIES[0],
  offers: [],
  currentOffer: {},
  comments: [],
  sorting: SortingType.POPULAR,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  login: '',
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {
        ...state,
        city: action.payload,
      };

    case ActionType.ChangeSorting:
      return {
        ...state,
        sorting: action.payload,
      };

    case ActionType.LoadOffers:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };

    case ActionType.LoadCurrentOffer:
      return {
        ...state,
        currentOffer: action.payload,
      };

    case ActionType.LoadComments:
      return {
        ...state,
        comments: action.payload,
        isDataLoaded: true,
      };

    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

    case ActionType.RequireLogout:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };

    case ActionType.SetLogin:
      return {
        ...state,
        login: action.payload,
      };

    default:
      return state;
  }
};

export { reducer };
