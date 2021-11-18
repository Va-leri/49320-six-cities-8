import { makeCommentsGet, makeOffer, makeOffers } from '../../utils/mocks';
import { changeFavoriteStatus, loadComments, loadCurrentOffer, loadFavoriteOffers, loadNearbyOffers, loadOffers, requireDataUnload } from '../action';
import { serviceData } from './service-data';


describe('Reducer: serviceData', () => {
  const initialState = {
    offers: [],
    favoriteOffers: [],
    currentOffer: {},
    nearbyOffers: [],
    comments: [],
    isDataLoaded: false,
  };

  it('without additional parameters should return initial state', () => {
    expect(serviceData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('shoud set state.isDataLoaded to false', () => {
    const state = {
      offers: [],
      favoriteOffers: [],
      currentOffer: {},
      nearbyOffers: [],
      comments: [],
      isDataLoaded: true,
    };

    expect(serviceData(state, requireDataUnload()))
      .toEqual({ ...initialState, isDataLoaded: false });
  });

  it('should set offers by load offers', () => {
    const fakeOffers = makeOffers();

    expect(serviceData(initialState, loadOffers(fakeOffers)))
      .toEqual({
        ...initialState,
        offers: fakeOffers,
        isDataLoaded: true,
      });
  });

  it('should set favoriteOffers by load favorite offers', () => {
    const fakeOffers = makeOffers();

    expect(serviceData(initialState, loadFavoriteOffers(fakeOffers)))
      .toEqual({
        ...initialState,
        favoriteOffers: fakeOffers,
        isDataLoaded: true,
      });
  });

  it('should set nearbyOffers by load nearby offers', () => {
    const fakeOffers = makeOffers();

    expect(serviceData(initialState, loadNearbyOffers(fakeOffers)))
      .toEqual({
        ...initialState,
        nearbyOffers: fakeOffers,
      });
  });

  it('should set currentOffer offers by load current offer', () => {
    const fakeOffer = makeOffer();

    expect(serviceData(initialState, loadCurrentOffer(fakeOffer)))
      .toEqual({
        ...initialState,
        currentOffer: fakeOffer,
        isDataLoaded: true,
      });
  });


  it('should set comments by load comments', () => {
    const fakeComments = makeCommentsGet();

    expect(serviceData(initialState, loadComments(fakeComments)))
      .toEqual({
        ...initialState,
        comments: fakeComments,
      });
  });


  it('should change isFavorite field value in corresponding offer from offers property', () => {
    const state = {
      ...initialState,
      offers: makeOffers(),
    };

    const id = state.offers[0].id;
    const isFavorite = !state.offers[0].isFavorite;

    const changedOffer = {
      ...state.offers[0],
      isFavorite,
    };

    expect(serviceData(state, changeFavoriteStatus({ id, isFavorite })))
      .toEqual({
        ...state,
        offers: [
          changedOffer,
          ...state.offers.slice(1),
        ],
      });
  });
});

export { };
