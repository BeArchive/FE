import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import LoginPage from '../pages/loginPage/LoginPage';
import MainPage from '../pages/mainPage/MainPage';
import ArchivePage from '../pages/archivePage/ArchivePage';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';

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
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
