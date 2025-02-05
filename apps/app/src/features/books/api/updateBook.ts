import { CreateBookInput } from '@repo/prisma/dtos/books.dto';
import { useMutation } from '@tanstack/react-query';
import { api } from '~/utils/axios';
import { APIBook } from './getBooks';
import { enqueueSnackbar } from 'notistack';

/**
 * Fetches the todo list from the 'sample' route.
 */
export const updateBook = async (input: CreateBookInput) => {
  const response = await api.put<APIBook>(`/books/${input.id}`, input);
  return response.data;
};

/**
 * React Query hook to get the todo list.
 */
export function useUpdateBook() {
  return useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      enqueueSnackbar('Book updated successfully', {
        variant: 'success',
      });
    },
  });
}
