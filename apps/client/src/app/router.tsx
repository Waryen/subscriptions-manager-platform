import { Home, NotFound } from '@subscriptions-manager-platform/core';
import { AppLayout } from '@subscriptions-manager-platform/ui';
import { Routes } from '@subscriptions-manager-platform/utils';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: Routes.HOME,
        element: <Home />,
      },
    ],
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFound />,
  },
]);
