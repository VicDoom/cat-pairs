import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentUser } from '@/store/userSlice';
import { UserService } from '@/services/user';
import React, { createContext, useEffect, useRef, useState } from 'react';

type AuthContextType = {
  isAuth: boolean;
  isLoading: boolean;
  setAuth?: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  isLoading: true,
  setAuth: undefined,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = props => {
  const dispatch = useAppDispatch();
  const isUserAuth = useAppSelector(state => state.user.userAuth);

  const { children } = props;
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const isAuthRef = useRef(false);

  const abortController = new AbortController();

  const stopLoading = () => setLoading(false);

  const handleAuth = () => {
    setIsAuth(true);
    stopLoading();
  };

  useEffect(() => {
    if (!isAuthRef.current) {
      isAuthRef.current = true;
      UserService.getCurrentUser({ signal: abortController.signal }).then(
        res => {
          if (res?.isOk) {
            handleAuth();
            if (res?.user) dispatch(setCurrentUser(res.user));
          }
          stopLoading();
        }
      );
    }
    return () => {
      !isAuthRef.current && abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (isAuth) {
      UserService.getCurrentUser({ signal: abortController.signal }).then(
        res => {
          if (res?.isOk) {
            if (res?.user) dispatch(setCurrentUser(res.user));
          }
        }
      );
      stopLoading();
    }
    return () => {
      !isAuthRef.current && abortController.abort();
    };
  }, [isUserAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        setAuth: handleAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
