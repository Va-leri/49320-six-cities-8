import { createReducer } from '@reduxjs/toolkit';
import { ServiceData } from '../../types/state';
import { changeFavoriteStatus, loadComments, loadCurrentOffer, loadNearbyOffers, loadOffers, requireDataUnload } from '../action';

const initialState: ServiceData = {
  offers: [],
  currentOffer: {},
  nearbyOffers: [],
  comments: [],
  isDataLoaded: false,
};

const serviceData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(changeFavoriteStatus, (state, action) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      if (index >= 0) {
        state.offers[index].isFavorite = action.payload.isFavorite;
      }
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(requireDataUnload, (state) => {
      state.isDataLoaded = false;
    });
});

export { serviceData };
