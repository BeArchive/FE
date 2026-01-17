import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import LoginPage from '../pages/loginPage/LoginPage';
import MainPage from '../pages/mainPage/MainPage';
import ArchivePage from '../pages/archivePage/ArchivePage';
import ArchiveFolderPage from '../pages/archiveFolderPage/ArchiveFolderPage';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';
import BrainstormPage from '../pages/brainstormPage/BrainstormPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="main" replace />,
      },
      {
        path: 'main',
        element: <MainPage />,
      },
      {
        path: 'archive',
        element: <ArchivePage />,
      },
      {
        path: 'archive/:folderId',
        element: <ArchiveFolderPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'brainstorm',
        element: <BrainstormPage />, // 신규 채팅 시작
      },
      {
        path: 'brainstorm/:chatId',
        element: <BrainstormPage />, // 기존 채팅 조회
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

export default router;
