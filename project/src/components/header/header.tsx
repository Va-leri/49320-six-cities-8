import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUser } from '../../store/user-data/selectors';
import Guest from '../guest/guest';
import User from '../user/user';


function Header(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {
                  authorizationStatus === AuthorizationStatus.Auth
                    ? <User user={user} />
                    : <Guest />
                }
              </li>
              {
                authorizationStatus === AuthorizationStatus.Auth &&
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

export default Header;
