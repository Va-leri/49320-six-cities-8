import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { makeCityName, makeOffers } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Places from './places';
import { SortingType } from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Places', () => {
  it('should render correctly', () => {
    const city = makeCityName();
    const fakeOffers = makeOffers(7);
    const store = mockStore({
      SERVICE: {
        sorting: SortingType.Popular,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history} >
          <Places
            cityName={city}
            filteredOffers={fakeOffers}
            onListItemHover={jest.fn()}
          />
        </Router>
      </Provider>);

    expect(screen.getByText(new RegExp(`${fakeOffers.length} places to stay in ${city}`, 'i'))).toBeInTheDocument();
  });
});
