import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';
import { routs } from '../../router/routs';

type Props = {
  restricted?: boolean;
  redirectTo?: string;
};

const PublicRoute: FC<Props> = ({
  restricted = false,
  redirectTo = routs.INDEX,
}) => {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);

  const shouldRedirect = isLogged && restricted;

  return shouldRedirect ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default PublicRoute;
