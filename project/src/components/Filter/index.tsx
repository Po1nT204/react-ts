import React from 'react';
import style from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOnlyFavoriteFilter,
  selectOnlyReadFilter,
  selectOnlyNotReadFilter,
  setOnlyNotReadFilter,
  setOnlyFavoriteFilter,
  setOnlyReadFilter,
  resetFilters,
} from '../../redux/slices/filterSlice';

const Filter = () => {
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
  const onlyReadFilter = useSelector(selectOnlyReadFilter);
  const onlyNotReadFilter = useSelector(selectOnlyNotReadFilter);
  const dispatch = useDispatch();
  return (
    <ul className={style.buttonList}>
      <li>
        <button
          type="button"
          onClick={() => dispatch(resetFilters())}
          className={
            onlyFavoriteFilter || onlyReadFilter || onlyNotReadFilter
              ? style.filter
              : style.activeFilter
          }
        >
          Все
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => dispatch(setOnlyFavoriteFilter())}
          className={onlyFavoriteFilter ? style.activeFilter : style.filter}
        >
          Избранные
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => dispatch(setOnlyReadFilter())}
          className={onlyReadFilter ? style.activeFilter : style.filter}
        >
          Прочитанные
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => dispatch(setOnlyNotReadFilter())}
          className={onlyNotReadFilter ? style.activeFilter : style.filter}
        >
          Запланированные
        </button>
      </li>
    </ul>
  );
};

export default Filter;
