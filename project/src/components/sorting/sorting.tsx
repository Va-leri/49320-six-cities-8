import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SortingType } from '../../const';
import { changeSorting } from '../../store/action';

type SortingProps = {
  sortingType: SortingType,
}


function Sorting({ sortingType }: SortingProps): JSX.Element {
  const dispatch = useDispatch();

  const [isOptionsListOpened, setOptionsListState] = useState<boolean>(false);

  const onCurrentSortTypeClick = () => {
    setOptionsListState(true);
  };

  const onSortingTypeClick = (value: SortingType) => {
    dispatch(changeSorting(value));
    setOptionsListState(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onCurrentSortTypeClick}>
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="/icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOptionsListOpened ? 'places__options--opened' : ''}`}>
        {Object.entries(SortingType).map(([key, value]) => (
          <li className={`places__option ${sortingType === value ? 'places__option--active' : ''}`} tabIndex={0} key={key} data-testid='option' onClick={() => { onSortingTypeClick(value); }}>{value}</li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
