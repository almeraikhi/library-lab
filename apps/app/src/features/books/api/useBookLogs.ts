import { useQuery } from '@tanstack/react-query';
import {
  Book,
  GenresOnBooks,
  Genre,
  Author,
  BookUpdateLog,
} from '@repo/prisma/client';
import { api } from '~/utils/axios';

/**
 * Fetches the todo list from the 'sample' route.
 */
export const fetchBookLogs = async (params: { id: string }) => {
  const response = await api.get<BookUpdateLog[]>(`/books/${params.id}/logs`);
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
