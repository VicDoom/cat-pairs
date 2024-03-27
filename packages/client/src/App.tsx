import { ConfigProvider } from 'antd';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { AuthProvider, ErrorProvider } from '@/providers';
import React, { ErrorInfo } from 'react';
import { Page500 } from '@/pages';
import { THEME_ANTD, THEME_ANTD_DARK } from '@/helpers/constants/global';
import { useAppSelector } from './helpers/hooks/storeHooks';
import { Theme } from '@/helpers/constants/global';

function App() {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // eslint-disable-next-line no-console
    console.error('Error handled:', error, errorInfo);
  };
  const themeName =
    useAppSelector(store => store.user.theme) === Theme.Light
      ? THEME_ANTD
      : THEME_ANTD_DARK;

  return (
    <ErrorProvider errorPage={Page500} onError={handleError} theme={themeName}>
      <ConfigProvider theme={themeName}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                  index={route.index}
                />
              ))}
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ConfigProvider>
    </ErrorProvider>
  );
}

export default App;
