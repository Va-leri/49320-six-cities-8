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
  it('should render correctly when sorted type is "Popular"', () => {
    const fakeOffers = makeOffers(10);

    render(
      <Provider store={mockStore()}>
        <Router history={history} >
          <PlacesList
            offers={fakeOffers}
            sortingType={SortingType.Popular}
            screen={AppRoute.Main}
            onListItemHover={jest.fn()}
          />
        </Router>
      </Provider>);

    expect(screen.getAllByTestId('place-card')).toHaveLength(fakeOffers.length);
    expect(screen.getAllByTestId('place-card')[0]).toHaveTextContent(fakeOffers[0].title);
  });

  it('should render correctly when sorted type is "Price low to high"', () => {
    const fakeOffers = makeOffers(10);
    const sortedFakeOffers = fakeOffers.slice().sort((offer1, offer2) => offer1.price - offer2.price);

    render(
      <Provider store={mockStore()}>
        <Router history={history} >
          <PlacesList
            offers={fakeOffers}
            sortingType={SortingType.PriceAsc}
            screen={AppRoute.Main}
            onListItemHover={jest.fn()}
          />
        </Router>
      </Provider>);

    expect(screen.getAllByTestId('place-card')).toHaveLength(fakeOffers.length);
    expect(screen.getAllByTestId('place-card')[0]).toHaveTextContent(sortedFakeOffers[0].title);
  });

  it('should render correctly when sorted type is "Price high to low"', () => {
    const fakeOffers = makeOffers(10);
    const sortedFakeOffers = fakeOffers.slice().sort((offer1, offer2) => offer2.price - offer1.price);

    render(
      <Provider store={mockStore()}>
        <Router history={history} >
          <PlacesList
            offers={fakeOffers}
            sortingType={SortingType.PriceDesc}
            screen={AppRoute.Main}
            onListItemHover={jest.fn()}
          />
        </Router>
      </Provider>);

    expect(screen.getAllByTestId('place-card')).toHaveLength(fakeOffers.length);
    expect(screen.getAllByTestId('place-card')[0]).toHaveTextContent(sortedFakeOffers[0].title);
  });

  it('should render correctly when sorted type is "Top rated first"', () => {
    const fakeOffers = makeOffers(10);
    const sortedFakeOffers = fakeOffers.slice().sort((offer1, offer2) => offer2.rating - offer1.rating);

    render(
      <Provider store={mockStore()}>
        <Router history={history} >
          <PlacesList
            offers={fakeOffers}
            sortingType={SortingType.RatingDesc}
            screen={AppRoute.Main}
            onListItemHover={jest.fn()}
          />
        </Router>
      </Provider>);

    expect(screen.getAllByTestId('place-card')).toHaveLength(fakeOffers.length);
    expect(screen.getAllByTestId('place-card')[0]).toHaveTextContent(sortedFakeOffers[0].title);
  });
});
