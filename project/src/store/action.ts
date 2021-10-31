import { ActionType, ChangeCityAction } from '../types/action';
// import { City } from '../types/offers';

export const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});
