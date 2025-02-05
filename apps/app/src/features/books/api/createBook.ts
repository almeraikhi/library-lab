import { CreateBookInput } from '@repo/prisma/dtos/books.dto';
import { useMutation } from '@tanstack/react-query';
import { api } from '~/utils/axios';
import { APIBook } from './getBooks';

/**
 * Fetches the todo list from the 'sample' route.
 */
export const createBook = async (input: CreateBookInput) => {
  const response = await api.post<APIBook>('/books', input);
  return response.data;
};

/**
 * React Query hook to get the todo list.
 */
export function useCreateBook() {
  return useMutation({
    mutationFn: createBook,
  });
}
