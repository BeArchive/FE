import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import LoginPage from '../pages/loginPage/LoginPage';
import MainPage from '../pages/mainPage/MainPage';
import ArchivePage from '../pages/archivePage/ArchivePage';
import ArchiveFolderPage from '../pages/archiveFolderPage/ArchiveFolderPage';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';
import SocialCallbackPage from '../pages/socialCallbackPage/SocialCallbackPage';
import BrainstormPage from '../pages/brainstormPage/BrainstormPage';
import { protectedLoader, publicLoader } from './loaders';

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
        loader: protectedLoader,
      },
      {
        path: 'archive/:folderId',
        element: <ArchiveFolderPage />,
        loader: protectedLoader,
      },
      {
        path: 'brainstorm',
        element: <BrainstormPage />, // 신규 채팅 시작
        loader: protectedLoader,
      },
      {
        path: 'brainstorm/:chatId',
        element: <BrainstormPage />, // 기존 채팅 조회
        loader: protectedLoader,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
    loader: publicLoader,
  },
  {
    path: 'oauth/callback',
    element: <SocialCallbackPage />,
    loader: publicLoader,
  },
]);

export default router;
