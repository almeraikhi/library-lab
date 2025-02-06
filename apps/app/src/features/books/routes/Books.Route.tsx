import { BooksList } from '~/features/books/components/BooksList';

export const BooksRoute = () => {
  return (
    <>
      <div className='flex-1'>
        <BooksList />
      </div>
    </>
  );
};
