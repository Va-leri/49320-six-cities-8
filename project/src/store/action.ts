import { SortingType } from '../const';
import { ActionType } from '../types/action';

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

export const updateSorting = (sorting: SortingType) => ({
  type: ActionType.ChangeSorting,
  payload: sorting,
} as const);
