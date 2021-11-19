import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SortingType } from '../../const';
import Sorting from './sorting';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const sortingType = SortingType.POPULAR;

    render(
      <Provider store={mockStore()}>
        <Router history={history} >
          <Sorting
            sortingType={sortingType}
          />
        </Router>
      </Provider>);

    expect(screen.getAllByText(sortingType)).toHaveLength(2);
    expect(screen.getAllByTestId('option')).toHaveLength(Object.entries(SortingType).length);
  });
});
