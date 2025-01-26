import React from 'react';
import style from './QuotesList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { selectQuotes, fetchQuotes } from '../../redux/slices/quotesSlice';
import { Modal } from 'antd';
import {
  selectSort,
  setAvailableSortTypes,
  SortState,
} from '../../redux/slices/sortSlice';
import { selectBooks, fetchBookList } from '../../redux/slices/booksSlice';
import QuoteComponent from '../../components/Quote';
import QuoteForm from '../../components/QuoteForm';
import Sort from '../../components/Sort';
import Error from '../../components/Error';
import Skeleton from '../../components/Quote/Skeleton';
import { Quote } from '../../types/Quote';
import { sortQuotesOptionList } from '../../const';
import { Book } from '../../types/Book';

const QuotesList: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isSortReady, setIsSortReady] = React.useState<boolean>(false);
  const handleCloseModal = (): void => setOpen(false);
  const dispatch: AppDispatch = useDispatch();
  const quotes: Quote[] = useSelector(selectQuotes);
  const books: Book[] = useSelector(selectBooks);
  const { sortBy, sortOrder, availableSortTypes }: SortState =
    useSelector(selectSort);

  React.useEffect(() => {
    dispatch(setAvailableSortTypes(sortQuotesOptionList));
    dispatch(
      fetchBookList({
        sortBy: 'title',
        order: 'asc',
      })
    );
    setIsSortReady(true);
  }, [dispatch]);

  React.useEffect(() => {
    if (isSortReady) {
      dispatch(
        fetchQuotes({
          sortBy: sortBy,
          order: sortOrder,
        })
      );
    }
  }, [dispatch, sortBy, sortOrder, isSortReady]);

  return (
    <>
      <h1 className={style.header}>Мои любимые и запоминающиеся цитаты</h1>
      <div className={style.sort}>
        <Sort optionList={availableSortTypes} />
      </div>
      <div>
        <div>
          <button onClick={() => setOpen(true)} className={style.addNew}>
            Добавить новую цитату
          </button>
          <Modal
            title="Добавить новую цитату"
            open={open}
            onCancel={handleCloseModal}
            footer={null}
          >
            <QuoteForm onClose={handleCloseModal} booksList={books} />
          </Modal>
        </div>
        <div className={style.wrapper}>
          {quotes.length === 0 ? (
            Array.from({ length: 3 }, (_, index) => <Skeleton key={index} />)
          ) : (
            <ul className={style.list}>
              {quotes.map((quoteInfo) => (
                <QuoteComponent
                  quoteInfo={quoteInfo}
                  booksList={books}
                  key={quoteInfo.id}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
      <Error />
    </>
  );
};

export default QuotesList;
