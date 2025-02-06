import { useNavigate } from 'react-router-dom';
import { APIBook } from '../api/getBooks';
import dayjs from 'dayjs';

export const BookItem = ({ book }: { book: APIBook }) => {
  const navigate = useNavigate();

  const navigateToBook = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <button
      onClick={navigateToBook}
      className='grid md:grid-cols-4 grid-rows-1 gap-2 items-center justify-center border border-gray-200 rounded-md p-4 w-full'
    >
      <div className='flex items-center justify-center'>
        <img
          src='/images/book-placeholder-image.jpg'
          alt={book.title}
          className='min-w-40 h-60 object-cover rounded-md'
        />
      </div>
      <div className='flex flex-col gap-1 flex-shrink-0'>
        <div className='text-xl text-center'>{book.title}</div>
        <div className='opacity-80 text-center'>by {book.author.name}</div>
        <div>Published at {dayjs(book.publishedAt).format('YYYY')}</div>
      </div>
      <div className='flex md:flex-row flex-col md:gap-2 items-center max-w-72 justify-center'>
        <div>{book.genres.map((genre) => genre.genre.name).join(' • ')}</div>
      </div>
      <div className='flex flex-col items-center'>
        <div className='opacity-80'>ISBN</div>
        <div>{book.ISBN}</div>
      </div>
    </button>
  );
};
