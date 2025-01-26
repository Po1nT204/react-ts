import React from 'react';
import { useDispatch } from 'react-redux';
import {
  addFavoriteAuthor,
  editFavoriteAuthor,
} from '../../redux/slices/authorsSlice';
import { Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { setError } from '../../redux/slices/errorSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppDispatch } from '../../redux/store';
import { Author } from '../../types/Author';
import style from './AuthorForm.module.css';

type Inputs = {
  name: string;
  photoUrl: string;
};

interface AuthorFormProps {
  authorInfo?: Author;
  onClose: () => void;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ authorInfo, onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: authorInfo?.name || '',
      photoUrl: authorInfo?.photo || '',
    },
  });

  const isEditMode: boolean = !!authorInfo;
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    const authorData: Author = {
      id: isEditMode ? authorInfo!.id : uuidv4(),
      name: data.name,
      photo:
        data.photoUrl ||
        'https://sh-tajchinskaya-r52.gosweb.gosuslugi.ru/netcat_files/9/67/1_9e9CY6nDatrFlVkDHW.png',
      likedBooks: isEditMode ? authorInfo!.likedBooks : 0,
    };

    if (isEditMode) {
      dispatch(editFavoriteAuthor(authorData));
    } else {
      dispatch(addFavoriteAuthor(authorData));
    }

    setLoading(false);
    onClose();
  };

  const onErrors = () => dispatch(setError('Заполните все необходимые поля!'));

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div className={style.input}>
        <label htmlFor="name" className={style.label}>
          Имя автора:
        </label>
        <div className={style.inputWrapper}>
          <input
            className={style.inputField}
            id="name"
            type="text"
            {...register('name', {
              required: 'Имя автора не может быть пустым',
            })}
          />
          <small className={style.small}>
            {errors?.name && errors.name.message}
          </small>
        </div>
      </div>

      <div className={style.input}>
        <label htmlFor="photo" className={style.label}>
          Ссылка на фото:
        </label>
        <div className={style.inputWrapper}>
          <input
            id="photo"
            type="text"
            {...register('photoUrl')}
            className={style.inputField}
          />
          <small className={style.small}>
            {errors?.photoUrl && errors.photoUrl.message}
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

export default AuthorForm;
