import React from 'react';
import style from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <>
      <h1 className={style.header}>Страница не найдена</h1>
      <h2 className={style.text}>
        Такой страницы не существует. Перейдите на существующий адрес
      </h2>
    </>
  );
};

export default NotFound;
