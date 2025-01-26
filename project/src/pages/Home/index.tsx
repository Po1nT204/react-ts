import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, ConfigProvider } from 'antd';
import style from './Home.module.css';

const headerStyle: React.CSSProperties = {
  display: 'block',
  background: 'rgb(224, 179, 167)',
  color: '#443728',
  width: '30vw',
  fontWeight: '700',
  fontSize: '2.5em',
  textAlign: 'center',
  borderRadius: '10px 10px 0 0',
  padding: '20px 10px',
  marginLeft: '35vw',
};
const textStyle: React.CSSProperties = {
  display: 'block',
  background: 'rgb(224, 179, 167)',
  color: '#443728',
  width: '30vw',
  height: '15vh',
  fontSize: '2em',
  fontWeight: '400',
  borderRadius: '0 0 10px 10px',
  textAlign: 'center',
  padding: '20px 10px',
  marginLeft: '35vw',
  marginBottom: '50px',
};

const Home: React.FC = () => {
  return (
    <div className={style.pageHeader}>
      <div className={style.info}>
        <h1 className={style.homeHeader}>
          Сервис по ведению читательского дневника
        </h1>
        <p className={style.homeText}>
          Записывай впечатления и оценки о прочитанных книгах. Добавляйте
          любимые цитаты и авторов.
        </p>
        <Link to="my-book-shelf">
          <button className={style.linkButton}>Перейти к дневнику</button>
        </Link>
      </div>
      <div>
        <h2 className={style.possibilitiesHeader}>
          Обзор и рейтинг прочитанных книг
        </h2>
        <ul className={style.featuresList}>
          <li className={style.feature}>
            <h3 className={style.featureHeader}>О книге</h3>
            <p className={style.featureText}>
              Записывайте название и автора книги. Добавляйте обложку.
            </p>
          </li>
          <li className={style.feature}>
            <h3 className={style.featureHeader}>Дата прочтения</h3>
            <p className={style.featureText}>
              Отмечайте дату, когда закончили читать книгу.
            </p>
          </li>
          <li className={style.feature}>
            <h3 className={style.featureHeader}>Личная оценка</h3>
            <p className={style.featureText}>
              Выставляйте оценку по шкале от 1 до 10. Добавляйте книгу в
              избранное.
            </p>
          </li>
        </ul>
        <h2 className={style.possibilitiesHeader}>Любимые цитаты и авторы</h2>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#af8c83ff',
              fontFamily: 'Segoe UI',
            },
            components: {
              Carousel: {
                dotActiveWidth: 40,
                dotWidth: 32,
                dotHeight: 4,
              },
            },
          }}
        >
          <Carousel autoplay autoplaySpeed={4000}>
            <div>
              <h3 style={headerStyle}>Список любимых цитат</h3>
              <p style={textStyle}>Создайте свой список понравившихся цитат.</p>
            </div>
            <div>
              <h3 style={headerStyle}>Список любимых авторов</h3>
              <p style={textStyle}> Создайте список своих любимых авторов.</p>
            </div>
            <div>
              <h3 style={headerStyle}>Заметки</h3>
              <p style={textStyle}>
                Отмечайте и просматривайте уже прочитанные книги
              </p>
            </div>
          </Carousel>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Home;
