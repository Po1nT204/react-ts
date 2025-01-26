import React from 'react';
import style from './Quote.module.css';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteQuote } from '../../redux/slices/quotesSlice';
import QuoteForm from '../QuoteForm';
import { Quote as QuoteType } from '../../types/Quote';
import { AppDispatch } from '../../redux/store';
import { Book } from '../../types/Book';
import dayjs from 'dayjs';

interface QuoteProps {
  quoteInfo: QuoteType;
  booksList: Book[];
}

const Quote: React.FC<QuoteProps> = ({ quoteInfo, booksList }) => {
  const { id, author, quote, book, createDate } = quoteInfo;
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = React.useState<boolean>(false);
  const [isDisable, setIsDisable] = React.useState<boolean>(false);

  const handleOpenModal = (): void => setOpen(true);
  const handleCloseModal = (): void => setOpen(false);

  return (
    <li className={style.listItem}>
      <p className={style.quote}>"{quote}"</p>
      <p className={style.author}>{author}</p>
      <p className={style.book}>{book}</p>
      <p className={style.date}>
        Дата добавления: {dayjs(createDate).format('YYYY-MM-DD')}
      </p>
      <div className={style.functional}>
        <button
          onClick={() => {
            setIsDisable(true);
            dispatch(deleteQuote(id));
          }}
          disabled={isDisable}
          className={style.delete}
        >
          Удалить
        </button>
        <button onClick={handleOpenModal} className={style.change}>
          Изменить
        </button>
      </div>

      <Modal
        title="Изменить цитату"
        open={open}
        onCancel={handleCloseModal}
        footer={null}
      >
        <QuoteForm
          quoteInfo={{ id, quote, author, book, createDate }}
          onClose={handleCloseModal}
          booksList={booksList}
        />
      </Modal>
    </li>
  );
};

export default Quote;
