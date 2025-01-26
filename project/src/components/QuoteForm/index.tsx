import React from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addQuote, editQuote } from '../../redux/slices/quotesSlice';
import { setError } from '../../redux/slices/errorSlice';
import { Button } from 'antd';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Quote } from '../../types/Quote';
import { Book } from '../../types/Book';
import { AppDispatch } from '../../redux/store';
import style from './QuoteForm.module.css';

type Inputs = {
  quote: string;
  book: string;
  author: string;
};

interface QuoteFormProps {
  quoteInfo?: Quote;
  onClose: () => void;
  booksList: Book[];
}

const QuoteForm: React.FC<QuoteFormProps> = ({
  quoteInfo,
  onClose,
  booksList,
}) => {
  const baseDate: Date = new Date();
  const isEditMode: boolean = !!quoteInfo;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      quote: quoteInfo?.quote || '',
      author: quoteInfo?.author || '',
      book: quoteInfo?.book || '',
    },
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    const quoteData: Quote = {
      id: isEditMode ? quoteInfo!.id : uuidv4(),
      quote: data.quote,
      author: data.author,
      book: data.book,
      createDate: isEditMode ? dayjs(quoteInfo!.createDate) : dayjs(baseDate),
    };
    if (isEditMode) {
      dispatch(editQuote(quoteData));
    } else {
      dispatch(addQuote(quoteData));
    }
    setLoading(false);
    onClose();
  };

  const onErrors = () => dispatch(setError('Заполните все необходимые поля!'));

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div className={style.input}>
        <label htmlFor="quote" className={style.label}>
          Цитата:
        </label>
        <div className={style.inputWrapper}>
          <textarea
            className={style.area}
            id="quote"
            {...register('quote', { required: 'Обязательное поле' })}
          />
          <small className={style.small}>
            {errors?.quote && errors.quote.message}
          </small>
        </div>
      </div>
      <div className={style.input}>
        <label htmlFor="author" className={style.label}>
          Автор:
        </label>
        <input id="author" type="text" {...register('author')} />
        <small className="text-danger">
          {errors?.author && errors.author.message}
        </small>
      </div>
      <div className={style.input}>
        <label htmlFor="book" className={style.label}>
          Книга:
        </label>
        <div className={style.inputWrapper}>
          <select
            id="book"
            {...register('book', {
              required: 'Обязательное поле',
              minLength: 1,
            })}
          >
            <option value="">Выберите книгу</option>
            {booksList.map((book) => {
              return (
                <option value={book.title} key={book.id}>
                  {book.title}
                </option>
              );
            })}
          </select>
          <small className={style.small}>
            {errors?.book && errors.book.message}
          </small>
        </div>
      </div>
      <div className={style.functional}>
        <Button type="default" htmlType="button" onClick={onClose}>
          Отмена
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEditMode ? 'Изменить' : 'Добавить'}
        </Button>
      </div>
    </form>
  );
};

export default QuoteForm;
