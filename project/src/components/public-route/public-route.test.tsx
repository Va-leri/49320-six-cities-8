import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import PublicRoute from './public-route';

const history = createMemoryHistory();
const mockStore = configureMockStore();

/* function PrivateComponent(): JSX.Element {
  return (<h1>Private component</h1>);
} */

function PublicComponent(): JSX.Element {
  return (<h1>Public component</h1>);
}

function MainComponent(): JSX.Element {
  return (<h1>Main component</h1>);
}

describe('Component: PublicRoute', () => {
  beforeEach(() => {
    history.push('/public');
  });

  it('should render public component when authorizationStatus !== Authorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <Route exact path='/'>
            <MainComponent />
          </Route>
          <PublicRoute
            exact
            path='/public'
            render={() => <PublicComponent />}
          />
        </Router>
      </Provider>);

    expect(screen.queryByText('Main component')).not.toBeInTheDocument();
    expect(screen.getByText('Public component')).toBeInTheDocument();
  });

  it('should render main component when authorizationStatus === Authorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <Route exact path='/'>
            <MainComponent />
          </Route>
          <PublicRoute
            exact
            path='/public'
            render={() => <PublicComponent />}
          />
        </Router>
      </Provider>);

    expect(screen.queryByText('Public component')).not.toBeInTheDocument();
    expect(screen.getByText('Main component')).toBeInTheDocument();
  });
});
