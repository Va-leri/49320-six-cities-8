import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';

type UserProps = {
  login: string,
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  logout() {
    dispatch(logoutAction());
  },
});

const mapStateToProps = ({ authorizationStatus, login }: State) => ({
  authorizationStatus,
  login,
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

function User({ login }: UserProps): JSX.Element {
  return (
    <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile" >
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__user-name user__name">{login}</span>
    </Link>
  );
}

function Header({ authorizationStatus, login, logout }: PropsFromRedux): JSX.Element {
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
                    ? <User login={login} />
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
