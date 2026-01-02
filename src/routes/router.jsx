import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import LoginPage from '../pages/loginPage/LoginPage';
import MainPage from '../pages/mainPage/MainPage';
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
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
