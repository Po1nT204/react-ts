import React from 'react';
import style from './Book.module.css';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { LuBook, LuBookCheck } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import {
  deleteBookAsync,
  toggleFavoriteAsync,
  toggleReadAsync,
} from '../../redux/slices/booksSlice';
import { Modal } from 'antd';
import BookForm from '../BookForm';
import { Book as BookType } from '../../types/Book';
import { AppDispatch } from '../../redux/store';

export const Book: React.FC<BookType> = ({
  id,
  imageUrl,
  title,
  author,
  rating,
  isFavorite,
  isRead,
  readDate,
}) => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpenModal = (): void => setOpen(true);
  const handleCloseModal = (): void => setOpen(false);
  const dispatch: AppDispatch = useDispatch();

  return (
    <li className={style.listItem}>
      <img className={style.cover} src={imageUrl} />
      <span
        className={style.heart}
        onClick={() => dispatch(toggleFavoriteAsync(id))}
      >
        {isFavorite ? (
          <IoMdHeart className={style.activeHeart} />
        ) : (
          <IoMdHeartEmpty />
        )}
      </span>
      <span
        className={style.check}
        onClick={() => dispatch(toggleReadAsync(id))}
      >
        {isRead ? <LuBookCheck className={style.activeCheck} /> : <LuBook />}
      </span>
      <p className={style.title}>{title}</p>
      <p className={style.author}>{author}</p>
      {isRead ? <p className={style.rating}>Оценка: {rating}</p> : <></>}

      <div className={style.bottom}>
        <button
          className={style.delete}
          onClick={() => {
            setIsDisable(true);
            dispatch(deleteBookAsync(id));
          }}
          disabled={isDisable}
        >
          Удалить
        </button>
        <button className={style.change} onClick={handleOpenModal}>
          Изменить
        </button>
        <Modal
          title="Изменить информацию о книге"
          open={open}
          onCancel={handleCloseModal}
          footer={null}
        >
          <BookForm
            book={{
              id,
              title,
              author,
              rating,
              readDate,
              imageUrl,
              isFavorite,
              isRead,
            }}
            onClose={handleCloseModal}
          />
        </Modal>
      </div>
    </li>
  );
};

export default Book;
