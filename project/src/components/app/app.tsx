import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropertyScreen from '../property-screen/property-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
// import LoadingScreen from '../loading-screen/loading-screen';
import browserHistory from '../../browser-history';

type AppScreenProps = {
  reviews: Reviews
}

const mapStateToProps = ({ isDataLoaded, authorizationStatus }: State) => ({
  isDataLoaded,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppScreenProps;

function App({ reviews }: ConnectedComponentProps): JSX.Element {
  /* if (!isDataLoaded) {
    return <LoadingScreen />;
  } */

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={AppRoute.MAIN} exact>
          <MainScreen />
        </Route>
        <Route path={AppRoute.SIGN_IN} exact>
          <LoginScreen />
        </Route>
        <Route path={AppRoute.ROOM} exact>
          <PropertyScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <FavoritesScreen />}
        >
        </PrivateRoute>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
