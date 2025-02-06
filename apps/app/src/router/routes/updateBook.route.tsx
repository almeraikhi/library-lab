import { CreateBookInput } from '@repo/prisma/dtos/books.dto';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcumb/Breadcrumb';
import { useUpdateBook } from '~/features/books/api/updateBook';
import { useBook } from '~/features/books/api/useBook';
import { BookForm } from '~/features/books/components/BookForm';

export const UpdateBookRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading: isLoadingBook } = useBook({ id: id! });
  const { mutate: updateBook } = useUpdateBook();

  const handleUpdateBook = (data: CreateBookInput) => {
    updateBook(
      { ...data, publishedAt: new Date(data.publishedAt) },
      {
        onSuccess: () => {
          navigate(`/books/${id}`);
        },
      }
    );
  };

  if (isLoadingBook) return <div>Loading...</div>;

  if (!book) return <div>Book not found</div>;

  // Define breadcrumb items.
  const breadcrumbs = [
    { label: book.title, path: `/books/${book.id}` },
    { label: 'update' },
  ];

  return (
    <div className='flex-1 w-full'>
      <Breadcrumb items={breadcrumbs} />
      <BookForm
        defaultValues={{
          id: book.id,
          title: book.title,
          authorId: book.authorId,
          genresIds: book.genres.map((genre) => genre.genre.id),
          ISBN: book.ISBN,
          publishedAt: new Date(book.publishedAt),
        }}
        onSubmit={handleUpdateBook}
      />
    </div>
  );
};
