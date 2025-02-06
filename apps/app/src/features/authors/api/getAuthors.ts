import { Author } from '@repo/prisma/client';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/utils/axios';

/**
 * Fetches the todo list from the 'sample' route.
 */
export const fetchAuthors = async () => {
  const response = await api.get<Author[]>('/authors');
  return response.data;
};

/**
 * React Query hook to get the todo list.
 */
export function useGetAuthors() {
  return useQuery({
    queryKey: ['authors'],
    queryFn: fetchAuthors,
  });
}
