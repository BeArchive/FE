import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../components/logo/Logo';
import AuthButton from './components/authButton/AuthButton';
import ArchiveButton from './components/archiveButton/ArchiveButton';
import BrainstormNote from './components/brainstormNoteButton/BrainstormNoteButton';

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="relative flex flex-col w-full h-screen overflow-hidden">
      {/* Header: 로고, 로그인/로그아웃 버튼 */}
      <div className="flex flex-row items-center justify-between mx-50 mt-50 mb-33 shrink-0">
        <Logo />
        <AuthButton isLoggedIn={isLoggedIn} onClick={() => setIsLoggedIn(!isLoggedIn)} />
      </div>

      {/* 아카이브 보드 버튼 */}
      <div className="relative z-10 shrink-0">
        <ArchiveButton />
      </div>

      {/* Outlet: 배경색 임시 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 -mt-26">
        <Outlet />
      </div>

      {/* 브레인스토밍 노트 버튼 FAB */}
      <div className="fixed z-50 right-50 bottom-50">
        <BrainstormNote />
      </div>
    </div>
  );
};

export default RootLayout;
