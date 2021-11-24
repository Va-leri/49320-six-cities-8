import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthInfo } from '../../types/auth-info';

type UserProps = {
  user: AuthInfo | Record<string, never>,
}


function User({ user }: UserProps): JSX.Element {
  const avatar = user.avatarUrl;

  return (
    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile" >
      <div className="header__avatar-wrapper user__avatar-wrapper">
        {avatar &&
          <img className="header__avatar user__avatar" alt="User avatar" src={avatar} />}
      </div>
      <span className="header__user-name user__name">{user.email}</span>
    </Link >
  );
}

export default User;
