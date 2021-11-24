import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeCity, makePoints } from '../../utils/mocks';
import Map from './map';

const history = createMemoryHistory();
const points = makePoints(6);

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Router history={history} >
        <Map
          city={makeCity()}
          points={points}
          selectedPoint={points[1]}
          screen={AppRoute.Main}
        />
      </Router>);

    const mapSection = screen.getByTestId('map');

    expect(mapSection).toBeInTheDocument();
    expect(mapSection).toHaveClass('cities__map');
  });
});

