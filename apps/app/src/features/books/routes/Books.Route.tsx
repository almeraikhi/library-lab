import { BooksList } from '~/features/books/components/BooksList';
import { BooksFilters } from '../components/BooksFilters';

export const BooksRoute = () => {
  return (
    <>
      <div className='max-w-screen-lg px-4'>
        <BooksFilters />
      </div>
      <div className='flex-1 overflow-y-auto'>
        <div className='max-w-screen-lg px-4'>
          <BooksList />
        </div>
      </div>
    </>
  );
};
