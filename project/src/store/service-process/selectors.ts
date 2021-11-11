import { SortingType } from '../../const';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getCity = (state: State): string => state[NameSpace.service].city;

export const getSorting = (state: State): SortingType => state[NameSpace.service].sorting;
