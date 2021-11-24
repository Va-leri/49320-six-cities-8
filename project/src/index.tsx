import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { createAPI } from './services/api';
import { requireLogout } from './store/action';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import { redirect } from './store/middlewares/redirect';
import { rootReducer } from './store/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { Router } from 'react-router-dom';
import browserHistory from './browser-history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const api = createAPI(() => store.dispatch(requireLogout()));

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),

});

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={browserHistory}>
        <ToastContainer />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
