import { BooksList } from '~/features/books/components/BooksList';
import { BooksPagination } from '../components/BooksPagination';

export const BooksRoute = () => {
  return (
    <>
      <div className='flex-1 flex flex-col gap-4 pb-4 h-full'>
        <div className='flex-1 flex flex-col gap-4'>
          <BooksList />
        </div>
        <BooksPagination />
      </div>
    </>
  );
};
