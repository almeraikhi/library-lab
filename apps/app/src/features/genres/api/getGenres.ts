import { Genre } from '@repo/prisma/client';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/utils/axios';

/**
 * Fetches the todo list from the 'sample' route.
 */
export const fetchGenres = async () => {
  const response = await api.get<Genre[]>('/genres');
  return response.data;
};

/**
 * React Query hook to get the todo list.
 */
export function useGetGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
  });
}
