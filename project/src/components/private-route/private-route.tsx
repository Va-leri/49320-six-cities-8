import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-data/services';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element,
}

function PrivateRoute({ exact, path, render }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.AUTH ? render()
          : <Redirect to={AppRoute.SIGN_IN} />
      )}
    />
  );
}

export default PrivateRoute;
