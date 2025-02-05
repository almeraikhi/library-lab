import { useQuery } from '@tanstack/react-query';
import { api } from '~/utils/axios';

type Todo = {
  id: string;
  task: string;
  completed: boolean;
};

/**
 * Fetches the todo list from the 'sample' route.
 */
export const fetchTodoList = async () => {
  const response = await api.get<Todo[]>('/sample');
  return response.data;
};

/**
 * React Query hook to get the todo list.
 */
export function useGetTodoList() {
  return useQuery({
    queryKey: ['todoList'],
    queryFn: fetchTodoList,
  });
}
