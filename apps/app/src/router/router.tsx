import { useMemo } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { MainLayout } from '~/components/Layouts/MainLayout';

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/books' replace />, // Redirects from '/' to '/books'
    },
    {
      path: '/books',
      element: <MainLayout />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { HomeRoute } = await import('./routes/home');
            return { Component: HomeRoute };
          },
        },
        {
          path: 'add',
          lazy: async () => {
            const { CreateBookRoute } = await import(
              './routes/createBook.route'
            );
            return { Component: CreateBookRoute };
          },
        },
        {
          path: ':id',
          lazy: async () => {
            const { BookRoute } = await import('./routes/book.route');
            return { Component: BookRoute };
          },
        },
        {
          path: ':id/update',
          lazy: async () => {
            const { UpdateBookRoute } = await import(
              './routes/updateBook.route'
            );
            return { Component: UpdateBookRoute };
          },
        },
      ],
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
