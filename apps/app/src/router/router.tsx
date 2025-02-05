import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/books',
      lazy: async () => {
        const { HomeRoute } = await import('./routes/home');
        return { Component: HomeRoute };
      },
    },
    {
      path: '/books/add',
      lazy: async () => {
        const { CreateBookRoute } = await import('./routes/createBook.route');
        return { Component: CreateBookRoute };
      },
    },
    {
      path: '/books/:id',
      lazy: async () => {
        const { BookRoute } = await import('./routes/book.route');
        return { Component: BookRoute };
      },
    },
    {
      path: '/books/:id/update',
      lazy: async () => {
        const { UpdateBookRoute } = await import('./routes/updateBook.route');
        return { Component: UpdateBookRoute };
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
