import axiosMockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { APIRoute, AppRoute, AuthorizationStatus, ServerReplyCode } from '../const';
import { checkAuthAction, fetchCommentsAction, fetchCurrentOfferAction, fetchFavoriteAction, fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOffersAction, fetchReviewAction, loginAction, logoutAction } from './api-actions';
import { changeCity, changeFavoriteStatus, loadComments, loadCurrentOffer, loadFavoriteOffers, loadNearbyOffers, loadOffers, redirectToRout, requireAuthorization, requireLogout, setUserAuthInfo } from './action';
import { makeCommentPost, makeCommentsFromServer, makeOffer, makeOfferFromServer, makeOffersFromServer, makeUserAuthInfo, makeUserAuthInfoFromServer, makeUserFromServer } from '../utils/mocks';
import { adaptAuthInfoToClient, adaptCommentToClient, adaptOffersToClient, adaptOfferToClient } from '../adapter/adapter';
import { AUTH_TOKEN_KEY } from '../services/token';
import { datatype } from 'faker';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new axiosMockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should dispatch RequriedAuthorization(AuthorizationStatus.AUTH) when server return 200', async () => {
    const store = mockStore();
    const data = makeUserAuthInfo();

    mockAPI
      .onGet(APIRoute.LOGIN)
      .reply(ServerReplyCode.Success, data);

    expect(store.getActions())
      .toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions())
      .toEqual([
        requireAuthorization(AuthorizationStatus.AUTH),
        setUserAuthInfo(data),
      ]);
  });

  it('should dispatch RequireLogout() and reset user auth info by setUserAuthInfo({}) when server return 401', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.LOGIN)
      .reply(ServerReplyCode.Unauthorized, []);

    expect(store.getActions())
      .toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions())
      .toEqual([
        requireLogout(),
        setUserAuthInfo({}),
      ]);
  });

  it('should dispatch RequireAuthorization, SetUserAuthInfo and RedirectToRout', async () => {
    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    const authData = {
      email: 'any@email.ru',
      password: 'qwerty123',
    };

    const authInfo = makeUserAuthInfoFromServer();

    mockAPI
      .onPost(APIRoute.LOGIN, authData)
      .reply(ServerReplyCode.Success, authInfo);

    await store.dispatch(loginAction(authData));

    expect(store.getActions())
      .toEqual([
        requireAuthorization(AuthorizationStatus.AUTH),
        setUserAuthInfo(adaptAuthInfoToClient(authInfo)),
        redirectToRout(AppRoute.MAIN),
      ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY, authInfo.token);
  });

  it('should dispatch RequireLogout and reset user auth info by setUserAuthInfo({})', async () => {
    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    mockAPI
      .onDelete(APIRoute.LOGOUT)
      .reply(ServerReplyCode.NoContent);

    await store.dispatch(logoutAction());

    expect(store.getActions())
      .toEqual([
        requireLogout(),
        setUserAuthInfo({}),
      ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY);
  });

  it('should dispatch LoadOffers when GET /hotels', async () => {
    const store = mockStore();

    const offersFromServer = makeOffersFromServer(6);

    mockAPI
      .onGet(APIRoute.OFFERS)
      .reply(ServerReplyCode.Success, offersFromServer);

    await store.dispatch(fetchOffersAction());

    expect(store.getActions())
      .toEqual([
        loadOffers(adaptOffersToClient(offersFromServer)),
      ]);
  });

  it('should dispatch LoadCurrentOffer when GET /hotels/:id', async () => {
    const store = mockStore();
    const ID = 0;
    const offerFromServer = makeOfferFromServer();

    mockAPI
      .onGet(`${APIRoute.OFFERS}/${ID}`)
      .reply(ServerReplyCode.Success, offerFromServer);

    await store.dispatch(fetchCurrentOfferAction(ID));

    expect(store.getActions())
      .toEqual([
        loadCurrentOffer(adaptOfferToClient(offerFromServer)),
        changeCity(offerFromServer.city.name),
      ]);
  });

  it('should dispatch LoadFavoriteOffers when GET /favorite', async () => {
    const store = mockStore();
    const favoriteOffers = makeOffersFromServer(6);

    mockAPI
      .onGet(APIRoute.FAVORITES)
      .reply(ServerReplyCode.Success, favoriteOffers);

    await store.dispatch(fetchFavoriteOffersAction());

    expect(store.getActions())
      .toEqual([
        loadFavoriteOffers(adaptOffersToClient(favoriteOffers)),
      ]);
  });

  it('should dispatch LoadNearbyOffers when GET /nearby', async () => {
    const store = mockStore();
    const nearbyOffers = makeOffersFromServer(6);
    const id = nearbyOffers[0].id;

    mockAPI
      .onGet(`${APIRoute.OFFERS}/${id}${APIRoute.NEARBY}`)
      .reply(ServerReplyCode.Success, nearbyOffers);

    await store.dispatch(fetchNearbyOffersAction(id));

    expect(store.getActions())
      .toEqual([
        loadNearbyOffers(adaptOffersToClient(nearbyOffers)),
      ]);
  });

  it('should dispatch LoadComments when GET /comments', async () => {
    const store = mockStore();
    const comments = makeCommentsFromServer();
    const OBJECT_ID = 1;

    mockAPI
      .onGet(`${APIRoute.COMMENTS}/${OBJECT_ID}`)
      .reply(ServerReplyCode.Success, comments);

    await store.dispatch(fetchCommentsAction(OBJECT_ID));

    expect(store.getActions())
      .toEqual([
        loadComments(comments.map((item) => adaptCommentToClient(item))),
      ]);
  });

  it('should dispatch LoadComments when POST /comments', async () => {
    const comments = makeCommentsFromServer();

    const fakeCurrentOffer = makeOffer();
    const store = mockStore({
      DATA: {
        currentOffer: fakeCurrentOffer,
      },
    });

    const OBJECT_ID = fakeCurrentOffer.id;
    const newComment = makeCommentPost();
    const commentFromServer = {
      ...newComment,
      date: datatype.datetime().toString(),
      id: datatype.number(),
      user: makeUserFromServer(),
    };

    const commentsFromServer = [
      ...comments,
      commentFromServer,
    ];


    mockAPI
      .onPost(`${APIRoute.COMMENTS}/${OBJECT_ID}`, newComment)
      .reply(ServerReplyCode.Success, [
        ...comments,
        commentFromServer,
      ]);

    await store.dispatch(fetchReviewAction(newComment));

    expect(store.getActions())
      .toEqual([
        loadComments(commentsFromServer.map((item) => adaptCommentToClient(item))),
      ]);
  });

  it('should dispatch ChangeFavoriteStatus when POST /favorite/:id/{isFavorite: number}', async () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const fakeOfferFromServer = makeOfferFromServer();
    const fakeOfferFromClient = adaptOfferToClient(fakeOfferFromServer);
    const objectId = fakeOfferFromClient.id;
    const wasFavorite = fakeOfferFromClient.isFavorite;


    mockAPI
      .onPost(`${APIRoute.FAVORITES}/${objectId}/${Number(!wasFavorite)}`)
      .reply(ServerReplyCode.Success, {
        ...fakeOfferFromServer,
        'is_favorite': !fakeOfferFromServer.is_favorite,
      });

    await store.dispatch(fetchFavoriteAction(objectId, wasFavorite));

    expect(store.getActions())
      .toEqual([
        changeFavoriteStatus({ id: objectId, isFavorite: !wasFavorite }),
      ]);
  });
});
