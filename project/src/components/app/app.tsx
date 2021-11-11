import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropertyScreen from '../property-screen/property-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import browserHistory from '../../browser-history';
import { CommentsGet } from '../../types/comment';
import { getIsDataLoaded } from '../../store/service-data/selectors';
import { getAuthorizationStatus } from '../../store/user-data/services';

type AppScreenProps = {
  reviews: CommentsGet,
}

const mapStateToProps = (state: State) => ({
  isDataLoaded: getIsDataLoaded(state),
  authorizationStatus: getAuthorizationStatus(state),
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
