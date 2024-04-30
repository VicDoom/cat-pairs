import { ConfigProvider } from 'antd';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { AuthProvider, ErrorProvider } from '@/providers';
import React, { ErrorInfo, useEffect } from 'react';
import { Page500 } from '@/pages';
import { startServiceWorker } from './helpers';
import { THEME_ANTD_DARK, THEME_ANTD_LIGHT } from '@/helpers/constants/global';
import { useAppSelector } from './helpers/hooks/storeHooks';
import { Theme } from '@/helpers/constants/global';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import {
  StaticHandlerContext,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { NotificationProvider } from '@/providers/notification-provider';

interface AppProps {
  staticRouter?: RemixRouter;
  context?: StaticHandlerContext;
}

const App: React.FC<AppProps> = ({ staticRouter, context }) => {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error('Error handled:', error, errorInfo);
  };
  const themeName =
    useAppSelector(store => store.user.theme) === Theme.Light
      ? THEME_ANTD_LIGHT
      : THEME_ANTD_DARK;

  useEffect(() => startServiceWorker());
  return (
    <ErrorProvider errorPage={Page500} onError={handleError} theme={themeName}>
      <ConfigProvider theme={themeName}>
        <NotificationProvider>
          {staticRouter && context ? (
            <AuthProvider>
              <StaticRouterProvider router={staticRouter} context={context} />
            </AuthProvider>
          ) : (
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
          )}
        </NotificationProvider>
      </ConfigProvider>
    </ErrorProvider>
  );
};

export default App;
