import React from 'react';
import type { MenuProps } from 'antd';
import { Menu, ConfigProvider } from 'antd';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineHistoryEdu } from 'react-icons/md';
import { RiTeamLine } from 'react-icons/ri';
import { GiBookshelf } from 'react-icons/gi';
import style from './MainMenu.module.css';

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    label: (
      <NavLink to="." end>
        Главная
      </NavLink>
    ),
    key: 'home',
    icon: <AiOutlineHome />,
  },
  {
    label: <NavLink to="my-book-shelf">Мои книги</NavLink>,
    key: 'shelf',
    icon: <GiBookshelf />,
  },
  {
    label: <NavLink to="quotes">Цитаты</NavLink>,
    key: 'quotes',
    icon: <MdOutlineHistoryEdu />,
  },
  {
    label: <NavLink to="authors">Авторы</NavLink>,
    key: 'authors',
    icon: <RiTeamLine />,
  },
];

const MainMenu: React.FC = () => {
  const [current, setCurrent] = React.useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          margin: 19,
        },
        components: {
          Menu: {
            horizontalLineHeight: '60px',
            iconMarginInlineEnd: 17,
            iconSize: 20,
            fontSize: 17,
            horizontalItemHoverBg: '#f18e65',
            horizontalItemHoverColor: '#2a6af5',
            horizontalItemSelectedBg: '#c07151',
            horizontalItemSelectedColor: '#162a33',
            itemBg: '#af8c83ff',
          },
        },
      }}
    >
      <Menu
        className={style.menu}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        theme="light"
      />
    </ConfigProvider>
  );
};

export default MainMenu;
