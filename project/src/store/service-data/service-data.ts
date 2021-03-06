import { createReducer } from '@reduxjs/toolkit';
import { ServiceData } from '../../types/state';
import { changeFavoriteStatus, loadComments, loadCurrentOffer, loadFavoriteOffers, loadNearbyOffers, loadOffers, requireDataUnload, setLoading } from '../action';

const initialState: ServiceData = {
  offers: [],
  favoriteOffers: [],
  currentOffer: {},
  nearbyOffers: [],
  comments: [],
  isDataLoaded: false,
  isLoading: false,
};

const serviceData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
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
      state.isLoading = false;
      state.comments = action.payload;
    })
    .addCase(requireDataUnload, (state) => {
      state.isDataLoaded = false;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    });
});

export { serviceData };
