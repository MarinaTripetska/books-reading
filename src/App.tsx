import React, { useEffect } from 'react';
// import PagesRoutes from './views/PagesRoutes';
import { useAppDispatch } from './redux/app/hooks';
import authOperations from './redux/features/auth/authOperations';
import tokenService from './services/auth/token-service';
import Toast from './components/Toast';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  const dispatch = useAppDispatch();
  const accessToken = tokenService.getLocalAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(authOperations.getCurrent());
    }
  }, [dispatch, accessToken]);

  return (
    <>
      <RouterProvider router={router} />
      {/* <PagesRoutes /> */}
      <Toast />
    </>
  );
}

export default App;
