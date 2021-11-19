import { CITIES, SortingType } from '../../const';
import { makeCityName } from '../../utils/mocks';
import { changeCity, changeSorting } from '../action';
import { serviceProcess } from './service-process';

describe('Reducer: serviceProcess', () => {
  const initialState = {
    city: CITIES[0],
    sorting: SortingType.POPULAR,
  };

  it('without additional parameters should return initial state', () => {
    expect(serviceProcess(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should set city to fakeCity', () => {
    const fakeCity = makeCityName();

    expect(serviceProcess(initialState, changeCity(fakeCity)))
      .toEqual({
        ...initialState,
        city: fakeCity,
      });
  });

  it('should set sorting to SortingType.PRICE_ASC', () => {
    expect(serviceProcess(initialState, changeSorting(SortingType.PRICE_ASC)))
      .toEqual({
        ...initialState,
        sorting: SortingType.PRICE_ASC,
      });
  });
});

export { };
