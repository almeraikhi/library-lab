import { APIBook } from '../api/getBooks';
import dayjs from 'dayjs';

export const BookItem = ({ book }: { book: APIBook }) => {
  return (
    <div>
      <div className='text-lg'>{book.title}</div>
      <div className='opacity-80'>{book.author.name}</div>
      <div className='opacity-80'>{dayjs(book.publishedAt).format('YYYY')}</div>
      <div className='opacity-80'>{book.ISBN}</div>
      <div className='text-sm'>
        {book.genres.map((genre) => genre.genre.name).join(', ')}
      </div>
    </div>
  );
};
