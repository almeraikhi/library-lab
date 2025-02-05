import { Loading } from '~/components/Loading';
import { useGetBooks } from '../api/getBooks';
import { BookItem } from './BookItem';

export const BooksList = () => {
  const { data, isLoading } = useGetBooks();

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-2'>
      {data.map((book) => (
        <BookItem book={book} />
      ))}
    </div>
  );
};
