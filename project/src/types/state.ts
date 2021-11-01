import { SortingType } from '../const';
import { Offers } from './offers';

export type State = {
  city: string,
  offers: Offers,
  sorting: SortingType,
}
