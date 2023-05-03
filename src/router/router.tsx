import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '../Layout';
import Page404 from '../views/Page404';
import IntroPage from '../views/IntroPage';
import LoginPage from '../views/LoginPage';
import { routs } from './routs';
import RegisterPage from '../views/RegisterPage/RegisterPage';
import LibraryPage from '../views/LibraryPage/LibraryPage';
import TrainingPage from '../views/TrainingPage/TrainingPage';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import PublicRoute from '../components/PublicRoute/PublicRoute';

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: routs.INDEX,
    errorElement: <Page404 />,

    children: [
      {
        element: <PublicRoute restricted redirectTo={routs.LIBRARY} />,
        children: [
          {
            element: <IntroPage />,
            index: true,
          },
          {
            element: <LoginPage />,
            path: routs.LOGIN,
          },
          {
            element: <RegisterPage />,
            path: routs.REGISTRATION,
          },
        ],
      },

      {
        element: <PrivateRoute redirectTo={routs.LOGIN} />,
        children: [
          {
            element: <LibraryPage />,
            path: routs.LIBRARY,
          },
          {
            element: <TrainingPage />,
            path: routs.TRAINING,
          },
        ],
      },
    ],
  },
]);

export default router;
