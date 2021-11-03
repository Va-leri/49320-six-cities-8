import { SortingType } from '../const';
import { ActionType, ChangeCityAction, ChangeSortingAction } from '../types/action';

export const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const updateSorting = (sorting: SortingType): ChangeSortingAction => ({
  type: ActionType.ChangeSorting,
  payload: sorting,
});
