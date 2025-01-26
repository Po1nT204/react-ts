import React from 'react';
import style from './AuthorsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import {
  selectPotentialFavoriteAuthors,
  selectFavoriteAuthors,
  fetchFavoriteAuthors,
  fetchPotentialFavorites,
} from '../../redux/slices/authorsSlice';
import {
  selectSort,
  setAvailableSortTypes,
  SortState,
} from '../../redux/slices/sortSlice';
import AuthorComponent from '../../components/Author';
import AuthorForm from '../../components/AuthorForm';
import Sort from '../../components/Sort';
import Error from '../../components/Error';
import Skeleton from '../../components/Author/Skeleton';
import { AppDispatch } from '../../redux/store';
import { Author } from '../../types/Author';
import { sortAuthorsOptionList } from '../../const';

const Authors = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isSortReady, setIsSortReady] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleCloseModal = (): void => setOpen(false);
  const potentialAuthor: Author[] = useSelector(selectPotentialFavoriteAuthors);
  const favoriteAuthors: Author[] = useSelector(selectFavoriteAuthors);
  const { sortBy, sortOrder, availableSortTypes }: SortState =
    useSelector(selectSort);

  React.useEffect(() => {
    dispatch(setAvailableSortTypes(sortAuthorsOptionList));
    dispatch(fetchPotentialFavorites());
    setIsSortReady(true);
  }, [dispatch]);

  React.useEffect(() => {
    if (isSortReady) {
      dispatch(fetchFavoriteAuthors({ sortBy: sortBy, order: sortOrder }));
    }
  }, [dispatch, sortBy, sortOrder, isSortReady]);

  return (
    <>
      <h1 className={style.header}>Список любимых авторов</h1>
      <div>
        <h2 className={style.possible}>Возможно любимые авторы</h2>
        <div className={style.wrapper}>
          {potentialAuthor.length === 0 ? (
            Array.from({ length: 4 }, (_, index) => <Skeleton key={index} />)
          ) : (
            <ul className={style.pList}>
              {potentialAuthor.map((authorInfo) => (
                <AuthorComponent {...authorInfo} key={authorInfo.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        <h2 className={style.favorite}>Любимые авторы</h2>
        <div className={style.sort}>
          <Sort optionList={availableSortTypes} />
        </div>
        <div>
          <button onClick={() => setOpen(true)} className={style.add}>
            Добавить нового автора
          </button>
          <Modal
            title="Добавить нового автора"
            open={open}
            onCancel={handleCloseModal}
            footer={null}
          >
            <AuthorForm onClose={handleCloseModal} />
          </Modal>
        </div>
        <div className={style.wrapper}>
          {favoriteAuthors.length === 0 ? (
            Array.from({ length: 4 }, (_, index) => <Skeleton key={index} />)
          ) : (
            <ul className={style.fList}>
              {favoriteAuthors.map((authorInfo) => (
                <AuthorComponent {...authorInfo} key={authorInfo.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
      <Error />
    </>
  );
};

export default Authors;
