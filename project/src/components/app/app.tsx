import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropertyScreen from '../property-screen/property-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import PublicRoute from '../public-route/public-route';

function App(): JSX.Element {
  return (
    <Switch>
      <Route path={AppRoute.Main} exact>
        <MainScreen />
      </Route>
      <Route path={AppRoute.Room} exact>
        <PropertyScreen />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.Favorites}
        render={() => <FavoritesScreen />}
      >
      </PrivateRoute>
      <PublicRoute
        exact
        path={AppRoute.SignIn}
        render={() => <LoginScreen />}
      >
      </PublicRoute>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
