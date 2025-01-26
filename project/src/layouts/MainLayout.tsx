import { Outlet } from 'react-router-dom';
import MainMenu from '../components/Menu/MainMenu';
import React from 'react';

const MainLayout: React.FC = () => {
  return (
    <>
      <MainMenu></MainMenu>
      <Outlet></Outlet>
    </>
  );
};

export default MainLayout;
