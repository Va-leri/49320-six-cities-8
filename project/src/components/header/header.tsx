import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { AuthInfo } from '../../types/auth-info';
import { State } from '../../types/state';

type UserProps = {
  user: AuthInfo | Record<string, never>,
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  logout() {
    dispatch(logoutAction());
  },
});

const mapStateToProps = ({ authorizationStatus, user }: State) => ({
  authorizationStatus,
  user,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Guest(): JSX.Element {
  return (
    <Link to={AppRoute.SIGN_IN} className="header__nav-link header__nav-link--profile" >
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__login">Sign in</span>
    </Link>
  );
}

function User({ user }: UserProps): JSX.Element {
  return (
    <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile" >
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__user-name user__name">{user.email}</span>
    </Link>
  );
}

function Header({ authorizationStatus, user, logout }: PropsFromRedux): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.MAIN} className="header__logo-link">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {
                  authorizationStatus === AuthorizationStatus.AUTH
                    ? <User user={user} />
                    : <Guest />
                }
              </li>
              {
                authorizationStatus === AuthorizationStatus.AUTH &&
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/" onClick={(evt) => {
                    evt.preventDefault();
                    logout();
                  }}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Header };
export default connector(Header);
