import { SortingType } from '../const';
import { Offers } from './offers';

export enum ActionType {
  ChangeCity = 'changeCity',
  SetOffers = 'setOffers',
  ChangeSorting = 'changeSorting',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity,
  payload: string,
}


export type SetOffersAction = {
  type: ActionType.SetOffers,
  payload: Offers,
}

export type ChangeSortingAction = {
  type: ActionType.ChangeSorting,
  payload: SortingType,
}

export type Actions = ChangeCityAction | SetOffersAction | ChangeSortingAction;
