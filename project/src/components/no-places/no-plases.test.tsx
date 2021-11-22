import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { makeCityName } from '../../utils/mocks';
import NoPlaces from './no-plases';

const history = createMemoryHistory();

describe('Component: NoPlaces', () => {
  it('should render correctly', () => {
    const city = makeCityName();

    render(
      <Router history={history} >
        <NoPlaces
          cityName={city}
        />
      </Router>);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${city}`, 'i'))).toBeInTheDocument();
  });
});
