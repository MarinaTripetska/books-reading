import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '../Layout';
import Page404 from '../views/Page404';
import IntroPage from '../views/IntroPage';
import LoginPage from '../views/LoginPage';
import { routs } from './routs';
import RegisterPage from '../views/RegisterPage/RegisterPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: routs.INDEX,
    errorElement: <Page404 />,

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
]);

export default router;
