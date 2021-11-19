import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Guest from './guest';

const history = createMemoryHistory();

describe('Component: Guest', () => {
  it('should render correctly', () => {
    render(
      <Router history={history} >
        <Guest />
      </Router>);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});

export { };
