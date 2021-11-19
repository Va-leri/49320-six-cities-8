import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeCityName } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import LoginScreen from './login-screen';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: LoginScreen', () => {
  const city = makeCityName();
  it('should render correctly when user is NOT authorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      SERVICE: {
        city: city,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <LoginScreen />
        </Router>
      </Provider>);

    expect(screen.getAllByText(/sign in/i)).toHaveLength(3);
    expect(screen.getByPlaceholderText(/mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(city)).toBeInTheDocument();
  });

});
