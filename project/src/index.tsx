import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { reviews } from './mocks/reviews';
import { reducer } from './store/reducer';
import { createAPI } from './services/api';
import { requireLogout } from './store/action';
import { ThunkAppDispatch } from './types/action';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import { redirect } from './store/middlewares/redirect';

const api = createAPI(() => store.dispatch(requireLogout()));

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={reviews} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
