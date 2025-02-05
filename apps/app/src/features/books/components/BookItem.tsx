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
      className='flex md:flex-row flex-col gap-2 items-center border border-gray-200 rounded-md p-4 md:justify-between'
    >
      <div>
        <img
          src='/images/book-placeholder-image.jpg'
          alt={book.title}
          className='w-40 h-60 object-cover rounded-md'
        />
      </div>
      <div>
        <div className='text-xl text-center'>{book.title}</div>
        <div className='opacity-80 text-center'>by {book.author.name}</div>
      </div>
      <div className='flex md:flex-row flex-col md:gap-2 items-center'>
        <div className=''>{dayjs(book.publishedAt).format('YYYY')}</div>
        <div>{book.genres.map((genre) => genre.genre.name).join(' • ')}</div>
      </div>
      <div className='flex flex-col items-center'>
        <div className='opacity-80'>ISBN</div>
        <div>{book.ISBN}</div>
      </div>
    </button>
  );
};
