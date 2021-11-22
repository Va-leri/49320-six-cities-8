import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeCityName } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import LoginScreen from './login-screen';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const fakeLoginActionCreator = (payload: { email: string, password: string }) => ({
  type: 'LoginAction',
  payload: payload,
});

jest.mock('../../store/api-actions', () => {
  const originalModule = jest.requireActual('../../store/api-actions');

  return {
    __esModule: true,
    ...originalModule,
    loginAction: (payload: { email: string, password: string }) => ({
      type: 'LoginAction',
      payload: payload,
    }),
  };
});

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

    const loginInput = screen.getByPlaceholderText(/mail/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitBtn = screen.getByRole('button');

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(screen.getByText(city)).toBeInTheDocument();

    userEvent.type(loginInput, 'email@mail.ru');
    userEvent.type(passwordInput, 'qwerty1234');

    expect(screen.getByDisplayValue('email@mail.ru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('qwerty1234')).toBeInTheDocument();

    userEvent.click(submitBtn);
    expect(store.getActions())
      .toEqual([
        fakeLoginActionCreator({
          email: 'email@mail.ru',
          password: 'qwerty1234',
        }),
      ]);
  });

});
