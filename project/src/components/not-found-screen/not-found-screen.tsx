import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <Fragment>
      <style>
        {`
          .not-found {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .not-found__lead {
            margin-top: 0;
            margin-bottom: 7px;
            padding: 0 28px;
            font-size: 38px;
            line-height: 1.21053;
            font-weight: 700;
            font-style: oblique;
            text-align: center;
          }

          .not-found__link {
            text-align: center;
          }
        `}
      </style>
      <Header />

      <main className="page__main">
        <div className="container not-found">
          <p className="not-found__lead">404 Page Not Found</p>
          <p className="not-found__link">
            <Link to={AppRoute.Main}>
              <span>Back To Main</span>
            </Link>
          </p>
        </div>
      </main>
    </Fragment>
  );
}

export default NotFoundScreen;
