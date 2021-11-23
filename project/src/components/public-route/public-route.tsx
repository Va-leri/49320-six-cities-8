import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-data/selectors';

type PublicRouteProps = RouteProps & {
  render: () => JSX.Element,
}

function PublicRoute({ exact, path, render }: PublicRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus !== AuthorizationStatus.Auth ? render()
          : <Redirect to={AppRoute.Main} />
      )}
    />
  );
}

export default PublicRoute;
