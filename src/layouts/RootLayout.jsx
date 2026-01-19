import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import AuthButton from './components/buttons/AuthButton';
import ArchiveButton from './components/buttons/ArchiveButton';
import BrainstormNoteButton from './components/buttons/BrainstormNoteButton';
import useNavigation from '../hooks/useNavigation';
import BrainstormNote from './components/brainstormNote/BrainstormNote';

const RootLayout = () => {
  const { goTo } = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      goTo('/');
    } else {
      goTo('/login');
    }
  };

  return (
    <div className="relative flex flex-col w-full h-screen bg-primary-0 overflow-hidden">
      {/* Header: 로고, 로그인/로그아웃 버튼 */}
      <div className="flex-row-center justify-between mx-50 mt-50 mb-33 shrink-0">
        <Logo />
        <AuthButton isLoggedIn={isLoggedIn} onClick={handleAuthClick} />
      </div>

      {/* 아카이브 보드 버튼 */}
      <div className="relative z-10 shrink-0">
        <ArchiveButton onClick={() => goTo('/archive')} />
      </div>

      {/* Outlet */}
      <div className="flex-1 overflow-y-auto bg-white -mt-26">
        <Outlet />
      </div>

      {/* 브레인스토밍 노트 버튼 FAB */}
      <div className="fixed z-50 right-50 bottom-50 flex flex-col items-end gap-17">
        {isNoteOpen && <BrainstormNote onClose={() => setIsNoteOpen(false)} />}
        <BrainstormNoteButton isActive={isNoteOpen} onClick={() => setIsNoteOpen(!isNoteOpen)} />
      </div>
    </div>
  );
};

export default RootLayout;
