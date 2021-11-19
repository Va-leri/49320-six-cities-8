import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import PrivateRoute from './private-route';

const history = createMemoryHistory();
const mockStore = configureMockStore();

function PrivateComponent(): JSX.Element {
  return (<h1>Private component</h1>);
}

function PublicComponent(): JSX.Element {
  return (<h1>Public component</h1>);
}

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render private component when authorizationStatus === Authorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <Route exact path='/login'>
            <PublicComponent />
          </Route>
          <PrivateRoute
            exact
            path='/private'
            render={() => <PrivateComponent />}
          />
        </Router>
      </Provider>);

    expect(screen.queryByText('Public component')).not.toBeInTheDocument();
    expect(screen.getByText('Private component')).toBeInTheDocument();
  });

  it('should render public component when authorizationStatus === Unauthorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <Route exact path='/login'>
            <PublicComponent />
          </Route>
          <PrivateRoute
            exact
            path='/private'
            render={() => <PrivateComponent />}
          />
        </Router>
      </Provider>);

    expect(screen.queryByText(/Private component/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Public component/i)).toBeInTheDocument();
  });
});
