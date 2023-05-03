import React, { useEffect } from 'react';
// import PagesRoutes from './views/PagesRoutes';
import { useAppDispatch, useAppSelector } from './redux/app/hooks';
import authOperations from './redux/features/auth/authOperations';
import tokenService from './services/auth/token-service';
import Toast from './components/Toast';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import Loader from './components/Loader';
import authSelectors from './redux/features/auth/authSelectors';

function App() {
  const dispatch = useAppDispatch();
  const accessToken = tokenService.getLocalAccessToken();
  const isFetchingUser = useAppSelector(authSelectors.getFetching);

  useEffect(() => {
    if (accessToken) {
      dispatch(authOperations.getCurrent());
    }
  }, [dispatch, accessToken]);

  return !isFetchingUser ? (
    <>
      <RouterProvider router={router} fallbackElement={<Loader />} />
      {/* <PagesRoutes /> */}
      <Toast />
    </>
  ) : (
    <Loader />
  );
}

export default App;
