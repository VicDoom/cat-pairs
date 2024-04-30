import * as Pages from '@/pages';
import { AppDispatch, RootState } from './store';
import * as init from '@/helpers/pagesInit';
import { REDIRECT_TO_LOGIN } from '@/helpers/constants/api';

export type PageInitArgs = {
  dispatch: AppDispatch;
  state: RootState;
  ctx: string;
};

export const routes = [
  {
    path: '/',
    element: <Pages.MainPage />,
    index: true,
    fetchData: init.initProfilePage,
  },
  {
    path: '/game',
    element: <Pages.GamePage />,
    fetchData: init.initProfilePage,
  },
  {
    path: REDIRECT_TO_LOGIN,
    element: <Pages.LoginPage />,
  },
  {
    path: '/registration',
    element: <Pages.RegistrationPage />,
  },
  {
    path: '/profile',
    element: <Pages.ProfilePage />,
    fetchData: init.initProfilePage,
  },
  {
    path: '/change-password',
    element: <Pages.NewPassword />,
    fetchData: init.initProfilePage,
  },
  {
    path: '/leaderboard',
    element: <Pages.LeaderboardPage />,
    fetchData: init.initProfilePage,
  },
  {
    path: '/forum',
    element: <Pages.ForumPage />,
    fetchData: init.initProfilePage,
  },
  {
    path: '/forum/:id',
    element: <Pages.ForumTopicPage />,
    fetchData: init.initProfilePage,
  },
  {
    path: '*',
    element: <Pages.Page404 />,
  },
];
