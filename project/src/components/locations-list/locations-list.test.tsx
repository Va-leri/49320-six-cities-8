import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { CITIES } from '../../const';
import LocationsList from './locations-list';

const history = createMemoryHistory();

describe('Component: LocationsList', () => {
  it('should render correctly', () => {
    const city = CITIES[0];

    render(
      <Router history={history}>
        <LocationsList
          onCityClick={jest.fn()}
          activeCity={city}
        />
      </Router>);

    expect(screen.getAllByRole('link')).toHaveLength(CITIES.length);
    expect(screen.getByTestId(new RegExp(`${city}`, 'i'))).toHaveClass('tabs__item--active');
  });
});
