import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="pageContainer">
      layout
      <Outlet />
    </div>
  );
};

export default RootLayout;
