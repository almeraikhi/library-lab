import { useQuery } from '@tanstack/react-query';
import { api } from '~/utils/axios';

/**
 * Fetches the todo list from the 'sample' route.
 */
export const fetchBooksCount = async (params?: {
  authorId?: string;
  genresIds?: string[];
}) => {
  const response = await api.get<{ count: number }>('/books/count', { params });
  return response.data;
};

/**
 * React Query hook to get the todo list.
 */
export function useCountBooks(params?: {
  authorId?: string;
  genresIds?: string[];
}) {
  return useQuery({
    queryKey: ['books-count', params],
    queryFn: () => fetchBooksCount(params),
  });
}
