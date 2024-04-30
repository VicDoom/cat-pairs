import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { reducer } from '@/store';
import {
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server';
import { Request as ExpressRequest } from 'express';
import { routes } from '@/routes';
import { createFetchRequest, createUrl } from '@/entry-server.utils';
import App from '@/App';
import { configureStore } from '@reduxjs/toolkit';
import { matchRoutes } from 'react-router-dom';

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);
  if (context instanceof Response) {
    throw context;
  }

  const url = createUrl(req);
  const store = configureStore({
    reducer,
  });

  const foundRoutes = matchRoutes(routes, url);
  if (!foundRoutes) {
    throw new Error('Страница не найдена!');
  }

  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes;

  if (fetchData) {
    try {
      await fetchData({
        dispatch: store.dispatch,
        state: store.getState(),
        ctx: req.headers['cookie'] || 'noCookie',
      });
    } catch (e) {
      console.error('Инициализация страницы произошла с ошибкой', e);
    }
  }

  const staticRouter = createStaticRouter(dataRoutes, context);

  return {
    html: ReactDOM.renderToString(
      <React.StrictMode>
        <Provider store={store}>
          <App staticRouter={staticRouter} context={context} />
        </Provider>
      </React.StrictMode>
    ),
    initialState: store.getState(),
  };
};
