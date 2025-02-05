import { Loading } from '~/components/Loading';
import { useGetBooks } from '../api/getBooks';
import { BookItem } from './BookItem';
import { useGetGenres } from '~/features/genres/api/getGenres';
import { useGetAuthors } from '~/features/authors/api/getAuthors';
import { Select } from '~/components/Select';
import { z } from 'zod';
import { GetAllBooksParams } from '@repo/prisma/transactions/books.transactions';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';

// const GetBooksParamsSchema = z.object({
//   authorId: z.string().optional(),
//   genreIds: z.array(z.string()).optional(),
// });

export const BooksList = () => {
  const { data: authors, isLoading: isLoadingAuthors } = useGetAuthors();
  const { data: genres, isLoading: isLoadingGenres } = useGetGenres();

  const form = useForm<GetAllBooksParams>({
    defaultValues: {
      authorId: undefined,
      genresIds: undefined,
    },
  });

  const authorId = form.watch('authorId');
  const genresIds = form.watch('genresIds');

  const selectedAuthor = useMemo(() => {
    const author = authors?.find((author) => author.id === authorId);
    return author ? { label: author.name, value: author.id } : undefined;
  }, [authors, authorId]);

  const selectedGenres = useMemo(() => {
    const selected = genres?.filter((genre) => genresIds?.includes(genre.id));
    return selected?.map((genre) => ({
      label: genre.name,
      value: genre.id,
    }));
  }, [genres, genresIds]);

  const { data: books, isLoading: isLoadingBooks } = useGetBooks({
    authorId,
    genresIds,
  });

  if (
    isLoadingBooks ||
    isLoadingAuthors ||
    isLoadingGenres ||
    !books ||
    !authors ||
    !genres
  ) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-2'>
      <Select
        onChange={(value) => {
          if (!value) return;
          form.setValue('authorId', value.value, { shouldValidate: true });
        }}
        value={selectedAuthor ?? null}
        options={authors.map((author) => ({
          label: author.name,
          value: author.id,
        }))}
      />
      {books.map((book) => (
        <BookItem book={book} />
      ))}
    </div>
  );
};
