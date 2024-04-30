import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { REDIRECT_TO_LOGIN } from '@/helpers/constants/api';

export function withAuthRouteHOC<T extends JSX.IntrinsicAttributes>(
  WrappedRoute: React.ComponentType<T>
) {
  const ComponentWithAuth = (props: T) => {
    const navigate = useNavigate();
    const { isAuth } = useAuth();
    if (!isAuth) {
      setTimeout(() => navigate(REDIRECT_TO_LOGIN));
      return <></>;
    }
    return <WrappedRoute {...props} />;
  };

  return ComponentWithAuth;
}
