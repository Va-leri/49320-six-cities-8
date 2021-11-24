import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SortingType } from '../../const';
import Sorting from './sorting';
import userEvent from '@testing-library/user-event';
import { changeSorting } from '../../store/action';
import { State } from '../../types/state';
import { AnyAction } from 'redux';

const history = createMemoryHistory();
const mockStore = configureMockStore<State, AnyAction>();

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const sortingType = SortingType.Popular;
    const store = mockStore({
      SERVICE: {
        sorting: SortingType.Popular,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <Sorting />
        </Router>
      </Provider>);

    const options = screen.getAllByTestId('option');

    expect(screen.getAllByText(sortingType)).toHaveLength(2);
    expect(options).toHaveLength(Object.entries(SortingType).length);

    userEvent.click(screen.getAllByText(sortingType)[0]);
    expect(screen.getByTestId('options-list')).toHaveClass('places__options--opened');

    userEvent.click(screen.getByText(SortingType.PriceAsc));
    expect(screen.getByTestId('options-list')).not.toHaveClass('places__options--opened');
    expect(store.getActions())
      .toEqual([
        changeSorting(SortingType.PriceAsc),
      ]);
  });
});
