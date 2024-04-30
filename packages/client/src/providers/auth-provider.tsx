import React, { createContext, useEffect, useRef, useState } from 'react';
import { AuthService } from '@/services';
import { redirectToUrl } from '@/helpers/redirect-helper';
import { useNotification } from '@/providers/notification-provider';
import { useAppSelector } from '@/helpers/hooks/storeHooks';

type AuthContextType = {
  isAuth: boolean;
  setAuth?: () => void;
  deleteAuth?: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setAuth: undefined,
  deleteAuth: undefined,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = props => {
  const { children } = props;
  const currentUser = useAppSelector(state => state.user.currentUser);
  const [isAuth, setIsAuth] = useState(currentUser.id !== 0);
  const isAuthRef = useRef(false);
  const { notify } = useNotification();

  const handleAuth = () => {
    setIsAuth(true);
  };

  const deleteAuth = () => {
    setIsAuth(false);
  };

  useEffect(() => {
    const service = new AuthService();
    if (!isAuthRef.current) {
      isAuthRef.current = true;

      const handleOauth = (code: string) => {
        service
          .loginOauth({ code })
          .then(() => {
            handleAuth();
            redirectToUrl('/');
          })
          .catch(err => notify('error', err?.message));
      };

      if (typeof window !== undefined) {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
          handleOauth(code);
          return;
        }
      }
    }
    return () => {
      !isAuthRef.current && service.api.abortController.abort();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth: handleAuth,
        deleteAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
