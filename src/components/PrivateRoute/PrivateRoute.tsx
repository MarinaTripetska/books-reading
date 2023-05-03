import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';
import { routs } from '../../router/routs';
import Page404 from '../../views/Page404/Page404';

type Props = {
  redirectTo?: string;
};

const PrivateRoute: FC<Props> = ({ redirectTo = routs.LOGIN }) => {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);

  if (isLogged === undefined) {
    return <Page404 status="401" />;
  }

  return isLogged === true ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
