import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { makeCityName, makeOffers } from '../../utils/mocks';
import FavoriteLocationItem from './favorite-location-item';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: FavoriteLocationItem', () => {
  it('should render correctly', () => {
    const fakeOffers = makeOffers(2);
    const city = makeCityName();

    render(
      <Provider store={mockStore()}>
        <Router history={history} >
          <FavoriteLocationItem
            city={city}
            offers={fakeOffers}
          />
        </Router>
      </Provider>);

    expect(screen.getByText(city)).toBeInTheDocument();
  });
});
