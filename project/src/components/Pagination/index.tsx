import React from 'react';
import style from './Pagination.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPage,
  selectItemsPerPage,
  setPage,
} from '../../redux/slices/booksSlice';

interface PaginationProps {
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage);
  const itemsPerPage = useSelector(selectItemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  return (
    <div className={style.pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          className={currentPage === index + 1 ? style.activePage : style.page}
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
