import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SortingType } from '../../const';
import { updateSorting } from '../../store/action';

type SortingProps = {
  sortingType: SortingType,
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  changeSorting: updateSorting,
}, dispatch);

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & SortingProps;


function Sorting({ sortingType, changeSorting }: ConnectedComponentProps): JSX.Element {
  const [isOptionsListOpened, setOptionsListState] = useState<boolean>(false);

  const onCurrentSortTypeClick = () => {
    setOptionsListState(true);
  };

  const onSortingTypeClick = (value: SortingType) => {
    changeSorting(value);
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
          <li className={`places__option ${sortingType === value ? 'places__option--active' : ''}`} tabIndex={0} key={key} onClick={() => { onSortingTypeClick(value); }}>{value}</li>
        ))}
      </ul>
    </form>
  );
}

export { Sorting };
export default connector(Sorting);
