import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropertyScreen from '../property-screen/property-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  return (
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
  );
}

export default App;
