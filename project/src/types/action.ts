import { City, Offers } from './offers';

export enum ActionType {
  ChangeCity = 'changeCity',
  SetOffers = 'setOffers',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity,
  payload: City,
}


export type SetOffersAction = {
  type: ActionType.SetOffers,
  payload: Offers,
}

export type Actions = ChangeCityAction | SetOffersAction;
