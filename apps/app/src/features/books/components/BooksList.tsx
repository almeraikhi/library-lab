import { Loading } from '~/components/Loading';
import { useGetBooks } from '../api/getBooks';
import { useBookStore } from '../stores/booksStore';
import { BookItem } from './BookItem';

export const BooksList = () => {
  const { authorId, genresIds, page } = useBookStore();
  const { data: books, isLoading: isLoadingBooks } = useGetBooks({
    authorId,
    genresIds,
    page,
  });

  if (isLoadingBooks || !books) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-2 w-full justify-center items-center'>
      {books.map((book) => (
        <BookItem book={book} />
      ))}
    </div>
  );
};
