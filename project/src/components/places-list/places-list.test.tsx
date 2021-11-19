import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppRoute, SortingType } from '../../const';
import { makeOffers } from '../../utils/mocks';
import PlacesList from './places-list';
import { configureMockStore } from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: PlacesList', () => {
  it('should render correctly', () => {
    const fakeOffers = makeOffers(15);
    const sortedFakeOffers = fakeOffers.slice().sort((offer1, offer2) => offer1.price - offer2.price);

    render(
      <Provider store={mockStore()}>
        <Router history={history} >
          <PlacesList
            offers={fakeOffers}
            sortingType={SortingType.PRICE_ASC}
            screen={AppRoute.MAIN}
            onListItemHover={jest.fn()}
          />
        </Router>
      </Provider>);

    expect(screen.getAllByTestId('place-card')).toHaveLength(fakeOffers.length);
    expect(screen.getAllByTestId('place-card')[0]).toHaveTextContent(sortedFakeOffers[0].title);
  });
});
