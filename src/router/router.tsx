import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { routs } from './routs';

import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import Loader from '../components/Loader';

const Layout = lazy(() => import('../views/Layout'));
const IntroPage = lazy(() => import('../views/IntroPage'));
const LoginPage = lazy(() => import('../views/LoginPage'));
const RegisterPage = lazy(() => import('../views/RegisterPage'));
const LibraryPage = lazy(() => import('../views/LibraryPage'));
const TrainingPage = lazy(() => import('../views/TrainingPage'));
const ErrorPage = lazy(() => import('../views/ErrorPage'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: routs.INDEX,

    errorElement: <ErrorPage />,

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
            element: (
              <Suspense fallback={<Loader />}>
                <LibraryPage />
              </Suspense>
            ),
            path: routs.LIBRARY,
          },
          {
            element: (
              <Suspense fallback={<Loader />}>
                <TrainingPage />
              </Suspense>
            ),
            path: routs.TRAINING,
          },
        ],
      },
    ],
  },
]);

export default router;
