import React from 'react';
import BookComponent from '../../components/Book';
import BookForm from '../../components/BookForm';
import Sort from '../../components/Sort';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';
import Error from '../../components/Error';
import Skeleton from '../../components/Book/Skeleton';
import style from './BookList.module.css';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBookList,
  selectBooks,
  selectPage,
  selectItemsPerPage,
} from '../../redux/slices/booksSlice';
import {
  selectOnlyFavoriteFilter,
  selectOnlyNotReadFilter,
  selectOnlyReadFilter,
} from '../../redux/slices/filterSlice';
import {
  selectSort,
  setAvailableSortTypes,
} from '../../redux/slices/sortSlice';
import { AppDispatch } from '../../redux/store';
import { sortBookOptionList } from '../../const';
import { Book } from '../../types/Book';
import { SortState } from '../../redux/slices/sortSlice';

const BookList: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isSortReady, setIsSortReady] = React.useState<boolean>(false);
  const handleCloseModal = (): void => setOpen(false);
  const booksList: Book[] = useSelector(selectBooks);
  const page: number = useSelector(selectPage);
  const itemsPerPage: number = useSelector(selectItemsPerPage);
  const { sortBy, sortOrder, availableSortTypes }: SortState =
    useSelector(selectSort);
  const onlyFavoriteFilter: boolean = useSelector(selectOnlyFavoriteFilter);
  const onlyReadFilter: boolean = useSelector(selectOnlyReadFilter);
  const onlyNotReadFilter: boolean = useSelector(selectOnlyNotReadFilter);
  const totalReadFilter: boolean | undefined = onlyReadFilter
    ? true
    : onlyNotReadFilter
    ? false
    : undefined;
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setAvailableSortTypes(sortBookOptionList));
    setIsSortReady(true);
  }, [dispatch]);

  React.useEffect(() => {
    if (isSortReady) {
      dispatch(
        fetchBookList({
          isRead: totalReadFilter,
          isFavorite: onlyFavoriteFilter || undefined,
          sortBy: sortBy || undefined,
          order: sortOrder || undefined,
        })
      );
    }
  }, [
    dispatch,
    booksList,
    isSortReady,
    totalReadFilter,
    onlyFavoriteFilter,
    sortBy,
    sortOrder,
    page,
    itemsPerPage,
  ]);

  const indexOfLastBook: number = page * itemsPerPage;
  const indexOfFirstBook: number = indexOfLastBook - itemsPerPage;
  const currentBooks: Book[] = booksList.slice(
    indexOfFirstBook,
    indexOfLastBook
  );

  return (
    <>
      <h1 className={style.header}>Мой читательский дневник</h1>
      <div className={style.functional}>
        <Filter />
        <Sort optionList={availableSortTypes} />
      </div>
      <div>
        <div>
          <button className={style.add} onClick={() => setOpen(true)}>
            Добавить новую книгу
          </button>
          <Modal
            title="Добавить новую книгу"
            open={open}
            onCancel={handleCloseModal}
            footer={null}
          >
            <BookForm onClose={handleCloseModal} />
          </Modal>
        </div>
        <div className={style.wrapper}>
          {booksList.length === 0 ? (
            Array.from({ length: 6 }, (_, index) => <Skeleton key={index} />)
          ) : (
            <ul className={style.list}>
              {currentBooks.map((book) => (
                <BookComponent {...book} key={book.id} />
              ))}
            </ul>
          )}
        </div>

        <Pagination totalItems={booksList.length} />
      </div>
      <Error />
    </>
  );
};

export default BookList;
