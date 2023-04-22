import React, { Suspense } from 'react';
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../../components/Loader';
import PublicRoute from '../../components/PublicRoute';
import PrivateRoute from '../../components/PrivateRoute';
import Header from '../../components/Header';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';

const IntroPage = lazy(() => import('../IntroPage'));
const LoginPage = lazy(() => import('../LoginPage'));
const RegisterPage = lazy(() => import('../RegisterPage'));
const LibraryPage = lazy(() => import('../LibraryPage'));
const TrainingPage = lazy(() => import('../TrainingPage'));
const Page404 = lazy(() => import('../Page404'));

const PagesRoutes = () => {
  const isFetchingUser = useAppSelector(authSelectors.getFetching);

  return !isFetchingUser ? (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<PublicRoute restricted redirectTo="/library" />}>
            <Route path="/" element={<IntroPage />} />
          </Route>

          <Route element={<PublicRoute restricted redirectTo="/library" />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<PublicRoute restricted redirectTo="/library" />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route path="/library" element={<PrivateRoute />}>
            <Route path="" element={<LibraryPage />} />
          </Route>
          <Route path="/training" element={<PrivateRoute />}>
            <Route path="" element={<TrainingPage />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </>
  ) : (
    <Loader />
  );
};

export default PagesRoutes;
