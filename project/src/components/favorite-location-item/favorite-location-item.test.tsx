import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { makeCityName, makeOffers } from '../../utils/mocks';
import FavoriteLocationItem from './favorite-location-item';

const history = createMemoryHistory();

describe('Component: User', () => {
  it('should render correctly', () => {
    const fakeOffers = makeOffers(6);
    const city = makeCityName();

    render(
      <Router history={history} >
        <FavoriteLocationItem
          city={city}
          offers={fakeOffers}
        />
      </Router>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(city)).toBeInTheDocument();
  });
});
