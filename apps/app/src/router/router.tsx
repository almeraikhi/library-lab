import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { HomeRoute } = await import('./routes/home');
        return { Component: HomeRoute };
      },
    },
    {
      path: '/create',
      lazy: async () => {
        const { CreateBookRoute } = await import('./routes/createBook.route');
        return { Component: CreateBookRoute };
      },
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./routes/not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
