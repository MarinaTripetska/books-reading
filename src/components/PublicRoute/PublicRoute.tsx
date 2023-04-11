import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';

type Props = {
  restricted?: boolean;
  redirectTo?: string;
};

const PublicRoute: FC<Props> = ({ restricted = false, redirectTo = '/' }) => {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);
  
  const shouldRedirect = isLogged && restricted;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Outlet />;
};

export default PublicRoute;
