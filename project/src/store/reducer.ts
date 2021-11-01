import { CITIES, SortingType } from '../const';
import { offers } from '../mocks/offers';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';

const initialState = {
  city: CITIES[0],
  offers: offers,
  sorting: SortingType.POPULAR,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload };
    case ActionType.SetOffers:
      return { ...state, offers: action.payload };
    case ActionType.ChangeSorting:
      return { ...state, sorting: action.payload };
    default:
      return state;
  }
};

export { reducer };
