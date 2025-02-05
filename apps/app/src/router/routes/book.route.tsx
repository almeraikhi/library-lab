import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcumb/Breadcrumb';
import { Button } from '~/components/Button';
import { useBook } from '~/features/books/api/useBook';

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
  const breadcrumbs = [
    { label: 'Books', path: '/books' },
    { label: data.title }, // Current page; not clickable.
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbs} />
      <div>IMAGE...</div>
      <div>{data.title}</div>
      <div>by {data.author.name}</div>
      <div>
        <div>Genres</div>
        {data.genres.map((genre) => genre.genre.name).join(', ')}
      </div>
      <div>Published at {dayjs(data.publishedAt).format('YYYY')}</div>
      <div>ISBN: {data.ISBN}</div>
      <div>Book Update History</div>
      <Button onClick={handleUpdateBook}>Update Book</Button>
    </div>
  );
};
