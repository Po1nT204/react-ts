import React from 'react';
import style from './Sort.module.css';
import { ImSortAmountAsc, ImSortAmountDesc } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSortOrder,
  setSortBy,
  selectSort,
  SortState,
} from '../../redux/slices/sortSlice';
import { Sort as SortType } from '../../types/Sort';
import { AppDispatch } from '../../redux/store';

interface SortProps {
  optionList: SortType[];
}

const Sort: React.FC<SortProps> = ({ optionList }) => {
  const dispatch: AppDispatch = useDispatch();
  const { sortBy, sortOrder }: SortState = useSelector(selectSort);

  const handleSortChange = (newSortBy: string): void => {
    dispatch(setSortBy(newSortBy));
  };

  const toggleSortOrder = (): void => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className={style.wrapper}>
      <label className={style.sortByText}>Сортировать по </label>
      <select
        className={style.sortByValue}
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        {optionList.map((option) => {
          return (
            <option key={option.text} value={option.sortType}>
              {option.text}
            </option>
          );
        })}
      </select>
      <button onClick={toggleSortOrder} className={style.toggleOrder}>
        {sortOrder === 'asc' ? <ImSortAmountAsc /> : <ImSortAmountDesc />}
      </button>
    </div>
  );
};

export default Sort;
