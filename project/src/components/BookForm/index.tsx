import React from 'react';
import dayjs from 'dayjs';
import style from './BookForm.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBookAsync,
  editBookAsync,
  fetchBookList,
} from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';
import { selectSort, SortState } from '../../redux/slices/sortSlice';
import { Button, DatePicker, Space } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Book } from '../../types/Book';
import { AppDispatch } from '../../redux/store';

type Inputs = {
  title: string;
  author: string;
  rating: number;
  readDate: dayjs.Dayjs;
  cover: string;
};

interface BookFormProps {
  book?: Book;
  onClose: () => void;
}

const dateFormat = 'YYYY-MM-DD';

const BookForm: React.FC<BookFormProps> = ({ book, onClose }) => {
  const { sortBy, sortOrder }: SortState = useSelector(selectSort);
  const baseDate: Date = new Date();
  const isEditMode: boolean = !!book;
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      title: book?.title || '',
      author: book?.author || '',
      rating: book?.rating || 5,
      readDate: book?.readDate ? dayjs(book.readDate) : dayjs(baseDate),
      cover: book?.imageUrl || '',
    },
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const cover: string | undefined = watch('cover');

  const handleCoverChange = (url: string): string => {
    if (url.includes('www.litres.ru')) {
      const urlParts: string[] = url.split('/');
      const bookIdPart: string = urlParts[urlParts.length - 2];
      const bookId: string | undefined = bookIdPart.split('-').pop();
      if (bookId) {
        return `https://cdn.litres.ru/pub/c/cover_200/${bookId}.jpg`;
      }
    }
    return url;
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    const bookData: Book = {
      id: isEditMode ? book!.id : uuidv4(),
      isFavorite: isEditMode ? book!.isFavorite : false,
      isRead: isEditMode ? book!.isRead : false,
      title: data.title,
      author: data.author,
      rating: data.rating,
      readDate: data.readDate ? dayjs(data.readDate) : dayjs(baseDate),
      imageUrl:
        handleCoverChange(data.cover) || 'https://loremflickr.com/150/220',
    };
    if (isEditMode) {
      dispatch(editBookAsync(bookData));
    } else {
      dispatch(addBookAsync(bookData));
      dispatch(fetchBookList({ sortBy: sortBy, order: sortOrder }));
    }
    setLoading(false);
    onClose();
  };

  const onErrors = () => dispatch(setError('Заполните все необходимые поля!'));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className={style.input}>
          <label htmlFor="title" className={style.label}>
            Название книги:
          </label>
          <div className={style.inputWrapper}>
            <input
              className={style.inputField}
              type="text"
              id="title"
              {...register('title', {
                required: 'Название книги не может быть пустым',
              })}
            />
            <small className={style.small}>
              {errors?.title && errors.title.message}
            </small>
          </div>
        </div>
        <div className={style.input}>
          <label htmlFor="author" className={style.label}>
            Автор книги:
          </label>
          <div className={style.inputWrapper}>
            <input
              className={style.inputField}
              type="text"
              id="author"
              {...register('author', {
                required: 'Автор книги не может быть пустым',
              })}
            />
            <small className={style.small}>
              {errors?.author && errors.author.message}
            </small>
          </div>
        </div>
        <div className={style.input}>
          <label htmlFor="rating" className={style.label}>
            Оценка:{' '}
          </label>
          <Controller
            name="rating"
            control={control}
            rules={{ required: 'Оценка обязательна' }}
            render={({ field }) => (
              <div className={style.fullGroup}>
                <div className={style.group}>
                  {Array.from({ length: 10 }, (_, index) => (
                    <React.Fragment key={index}>
                      <label htmlFor={`rating-${index + 1}`}>
                        <span>{index + 1}</span>
                      </label>
                      <input
                        type="radio"
                        id={`rating-${index + 1}`}
                        {...field}
                        value={index + 1}
                        checked={field.value === index + 1}
                        onChange={() => field.onChange(index + 1)}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          />
        </div>
        <div className={style.input}>
          <label htmlFor="date" className={style.label}>
            Дата прочтения:
          </label>
          <Controller
            name="readDate"
            control={control}
            rules={{ required: 'Дата прочтения обязательна' }}
            render={({ field }) => (
              <Space direction="vertical">
                <DatePicker
                  onChange={(date) => field.onChange(date)}
                  value={field.value}
                  format={dateFormat}
                />
              </Space>
            )}
          />
          <small className={style.small}>
            {errors?.readDate && errors.readDate.message}
          </small>
        </div>
        <div className={style.input}>
          <label htmlFor="cover" className={style.label}>
            Ссылка на фото обложки:
          </label>
          <input
            type="text"
            id="cover"
            {...register('cover')}
            className={style.inputField}
          />
        </div>
        {cover && (
          <div className={style.input}>
            <img
              src={handleCoverChange(cover)}
              alt="Book cover preview"
              style={{ maxWidth: '150px', maxHeight: '220px' }}
            />
          </div>
        )}
        <div className={style.functional}>
          <Button type="default" htmlType="button" onClick={onClose}>
            Отмена
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEditMode ? 'Изменить' : 'Добавить'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default BookForm;
