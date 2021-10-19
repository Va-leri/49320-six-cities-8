import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <Fragment>
      <Header />

      <main className="page__main">
        <div className="container">
          <p>404 Page Not Found</p>
          <p>
            <Link to={AppRoute.MAIN}>
              <span>Back To Main</span>
            </Link>
          </p>
        </div>
      </main>
    </Fragment>
  );
}

export default NotFoundScreen;
