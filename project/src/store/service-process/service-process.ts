import { createReducer } from '@reduxjs/toolkit';
import { CITIES, SortingType } from '../../const';
import { ServiceProcess } from '../../types/state';
import { changeCity, changeSorting } from '../action';

const initialState: ServiceProcess = {
  city: CITIES[0],
  sorting: SortingType.POPULAR,
};

const serviceProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
    });
});

export { serviceProcess };
