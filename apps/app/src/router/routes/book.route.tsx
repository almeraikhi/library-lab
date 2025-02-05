import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useBook } from '~/features/books/api/useBook';

export const BookRoute = () => {
  const { id } = useParams();
  const { data, isLoading } = useBook({ id: id! });

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
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
    </div>
  );
};
