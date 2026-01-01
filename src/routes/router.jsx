import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';
import LoginPage from '../pages/loginPage/LoginPage';
import MainPage from '../pages/mainPage/MainPage';
import RootLayout from '../layouts/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'main',
        element: <MainPage />,
      },
    ],
  },
]);

export default router;
