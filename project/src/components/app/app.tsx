import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropertyScreen from '../property-screen/property-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';

type AppScreenProps = {
  // cardsCount: number,
  offers: Offers,
  reviews: Reviews
}

function App({ offers, reviews }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.MAIN} exact>
          <MainScreen />
        </Route>
        <Route path={AppRoute.SIGN_IN} exact>
          <LoginScreen />
        </Route>
        <Route path={AppRoute.ROOM} exact>
          <PropertyScreen offers={offers} reviews={reviews} />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <FavoritesScreen offers={offers} />}
          authorizationStatus={AuthorizationStatus.AUTH}
        >
        </PrivateRoute>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
