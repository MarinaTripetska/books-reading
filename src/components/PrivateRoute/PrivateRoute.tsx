import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';
import Page404 from '../../views/Page404';

type Props = {
  redirectTo?: string;
};

const PrivateRoute: FC<Props> = ({ redirectTo = '/login' }) => {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);

  if (isLogged === undefined) {
    return <Page404 />;
  }

  return isLogged === true ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
