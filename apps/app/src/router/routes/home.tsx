import { useEffect } from 'react';
import { Loading } from '~/components/Loading';
import { BooksList } from '~/features/books/components/BooksList';
import { useGetTodoList } from '~/features/sample/api/getTodoList';

export const HomeRoute = () => {
  const { data, isLoading } = useGetTodoList();

  useEffect(() => {
    console.log('data result is', data);
  }, [data]);

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div>
      <BooksList />
    </div>
  );
};
