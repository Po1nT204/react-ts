import React from 'react';
import style from './Author.module.css';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavoriteAuthor,
  deleteFavoriteAuthor,
  selectFavoriteAuthors,
} from '../../redux/slices/authorsSlice';
import AuthorForm from '../AuthorForm';
import { Author as AuthorType } from '../../types/Author';
import { AppDispatch } from '../../redux/store';

const Author: React.FC<AuthorType> = ({ id, name, photo, likedBooks }) => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = React.useState<boolean>(false);
  const [isDisable, setIsDisable] = React.useState<boolean>(false);
  const favoriteAuthors: AuthorType[] = useSelector(selectFavoriteAuthors);
  const isPotential: boolean = !photo;
  const isFavorite: boolean = favoriteAuthors.some(
    (author: AuthorType) => author.name === name
  );
  const handleOpenModal = (): void => setOpen(true);
  const handleCloseModal = (): void => setOpen(false);

  const onAddClick = (): void => {
    setIsDisable(true);
    const placeholderPhoto =
      'https://sh-tajchinskaya-r52.gosweb.gosuslugi.ru/netcat_files/9/67/1_9e9CY6nDatrFlVkDHW.png';
    dispatch(
      addFavoriteAuthor({
        id: uuidv4(),
        name,
        photo: placeholderPhoto,
        likedBooks,
      })
    );
  };

  const onRemoveClick = (): void => {
    setIsDisable(true);
    dispatch(deleteFavoriteAuthor(id));
  };

  if (isPotential && isFavorite) {
    return null;
  }

  return (
    <li className={style.listItem}>
      {photo ? (
        <img src={photo} alt={name} className={style.portret} />
      ) : (
        <img
          src="https://sh-tajchinskaya-r52.gosweb.gosuslugi.ru/netcat_files/9/67/1_9e9CY6nDatrFlVkDHW.png"
          alt={name}
          className={style.portret}
        />
      )}

      <h3>{name}</h3>
      {likedBooks > 0 ? <p>Количество любимых книг: {likedBooks}</p> : <p></p>}

      <div className={style.functional}>
        {photo ? (
          <>
            <button onClick={handleOpenModal} className={style.change}>
              Изменить
            </button>
            <button
              onClick={() => onRemoveClick()}
              disabled={isDisable}
              className={style.delete}
            >
              Удалить
            </button>
            <Modal
              title="Изменить информацию об авторе"
              open={open}
              onCancel={handleCloseModal}
              footer={null}
            >
              <AuthorForm
                authorInfo={{ id, name, photo, likedBooks }}
                onClose={handleCloseModal}
              />
            </Modal>
          </>
        ) : (
          <button onClick={() => onAddClick()} className={style.add}>
            Добавить
          </button>
        )}
      </div>
    </li>
  );
};

export default Author;
