import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeOffer } from '../../utils/mocks';
import { AppRoute } from '../../const';
import PlaceCard from './place-card';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: PlaceCard', () => {
  it('should render correctly when user is authorized', () => {
    const fakeOffer = makeOffer();

    render(
      <Provider store={mockStore()}>
        <Router history={history} >
          <PlaceCard
            offer={fakeOffer}
            screen={AppRoute.Main}
            onPlaceCardHover={jest.fn()}
          />
        </Router>
      </Provider>);

    expect(screen.getByAltText(/Place image/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeOffer.price.toString(), 'i'))).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.type)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.length)
      .toBeGreaterThan(0);
  });

  it('should be Premium mark when offer.isPremium === true', () => {
    const fakeOffer = makeOffer();
    fakeOffer.isPremium = true;

    render(
      <Provider store={mockStore()}>
        <Router history={history} >
          <PlaceCard
            offer={fakeOffer}
            screen={AppRoute.Main}
            onPlaceCardHover={jest.fn()}
          />
        </Router>
      </Provider>);

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });
});
