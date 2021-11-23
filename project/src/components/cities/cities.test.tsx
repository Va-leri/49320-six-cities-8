import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AnyAction } from 'redux';
import { SortingType } from '../../const';
import { State } from '../../types/state';
import { makeOffers } from '../../utils/mocks';
import Cities from './cities';

const history = createMemoryHistory();
const mockStore = configureMockStore<State, AnyAction>();

jest.mock('../map/map');

describe('Component: Cities', () => {
  it('should render place cards if there are any filtered offers', () => {
    const city = 'Paris';
    const offers = makeOffers(2);
    const store = mockStore({
      SERVICE: {
        sorting: SortingType.Popular,
      },
      DATA: {
        currentOffer: undefined,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Cities
            areFilteredOffers
            filteredOffers={offers}
            cityName={city}
          />
        </Router>
      </Provider>);

    expect(screen.getAllByTestId('place-card')).toHaveLength(offers.length);
  });

  it('should render "NoPlaces" when there are no filtered offers', () => {
    const city = 'Paris';

    render(
      <Router history={history}>
        <Cities
          areFilteredOffers={false}
          filteredOffers={[]}
          cityName={city}
        />
      </Router>);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${city}`, 'i'))).toBeInTheDocument();
  });
});
