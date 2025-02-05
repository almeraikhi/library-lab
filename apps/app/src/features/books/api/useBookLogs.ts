import { useQuery } from '@tanstack/react-query';
import { Book, GenresOnBooks, Genre, Author } from '@repo/prisma/client';
import { api } from '~/utils/axios';

export type APIBook = Book & {
  genres: GenresOnBooks &
    {
      genre: Genre;
    }[];
  author: Author;
};

/**
 * Fetches the todo list from the 'sample' route.
 */
export const fetchBookLogs = async (params: { id: string }) => {
  const response = await api.get<APIBook>(`/books/${params.id}/logs`);
  return response.data;
};

/**
 * React Query hook to get the todo list.
 */
export function useBookLogs(params: { id: string }) {
  return useQuery({
    queryKey: ['book-logs', params],
    queryFn: () => fetchBookLogs(params),
  });
}
