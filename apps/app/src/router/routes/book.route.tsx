import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcumb/Breadcrumb';
import { Button } from '~/components/Button';
import { useBook } from '~/features/books/api/useBook';
import { BookUpdateLogs } from '~/features/books/components/BookUpdateLogs';

export const BookRoute = () => {
  const { id } = useParams();
  const { data, isLoading } = useBook({ id: id! });
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/books');
  };

  const handleUpdateBook = () => {
    navigate(`/books/${id}/update`);
  };

  if (isLoading) return <div>Loading...</div>;

  if (!data)
    return (
      <div className='flex h-screen items-center justify-center w-full flex-col gap-4'>
        <div className='text-2xl font-bold'>Book Not Found</div>
        <Button onClick={handleGoBack}>Go back</Button>
      </div>
    );

  // Define breadcrumb items.
  const breadcrumbs = [{ label: data.title }];

  return (
    <div>
      <Breadcrumb items={breadcrumbs} />
      <div className='flex flex-col gap-4'>
        <div className='flex md:flex-row flex-col items-center gap-1 md:justify-between'>
          <div>
            <img
              src='/images/book-placeholder-image.jpg'
              alt={data.title}
              className='min-w-40 h-60 object-cover rounded-md'
            />
          </div>
          <div className='flex flex-col items-center flex-shrink-0'>
            <div className='text-2xl'>{data.title}</div>
            <div className='opacity-80'>by {data.author.name}</div>
            <div>Published at {dayjs(data.publishedAt).format('YYYY')}</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='font-bold'>Genres</div>
            <div className='text-center'>
              {data.genres.map((genre) => genre.genre.name).join(' • ')}
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='font-bold'>ISBN</div>
            <div>{data.ISBN}</div>
          </div>
          <Button className='max-w-fit' onClick={handleUpdateBook}>
            Update Book
          </Button>
        </div>
        <div>
          <div>Change Logs</div>
          <BookUpdateLogs />
        </div>
      </div>
    </div>
  );
};
