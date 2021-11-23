import { FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { redirectToRout } from '../../store/action';
import { loginAction } from '../../store/api-actions';
import { getCity } from '../../store/service-process/selectors';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import Header from '../header/header';


function LoginScreen(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const currentCity = useSelector(getCity);
  const dispatch = useDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    dispatch(redirectToRout(AppRoute.Main));
  }

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current) {
      const authData = {
        email: loginRef.current.value,
        password: passwordRef.current.value,
      };

      dispatch(loginAction(authData));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" minLength={2} pattern={'(?=.*[0-9])(?=.*[A-Za-z])([0-9A-Za-z]+)'} required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{currentCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
