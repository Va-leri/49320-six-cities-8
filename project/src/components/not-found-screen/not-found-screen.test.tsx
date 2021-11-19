import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import NotFoundScreen from './not-found-screen';


const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <NotFoundScreen />
        </Router>
      </Provider>);

    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Back To Main/i)).toBeInTheDocument();
  });
});
