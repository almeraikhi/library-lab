import { CreateBookInput } from '@repo/prisma/dtos/books.dto';
import { useForm } from 'react-hook-form';
import { Input } from '~/components/Input';
import { Select } from '~/components/Select';
import { useGetAuthors } from '~/features/authors/api/getAuthors';
import { useGetGenres } from '~/features/genres/api/getGenres';

type SelectOption = {
  label: string;
  value: string;
};

type CreateBookFormInput = Omit<CreateBookInput, 'authorId' | 'genresIds'> & {
  author: SelectOption;
  genres: SelectOption[];
};

export const CreateBook = () => {
  const { data: authors, isLoading: isLoadingAuthors } = useGetAuthors();
  const { data: genres, isLoading: isLoadingGenres } = useGetGenres();

  const form = useForm<CreateBookFormInput>({
    defaultValues: {
      title: '',
      author: undefined,
      genres: [],
      ISBN: '',
      publishedAt: new Date(),
    },
  });

  const submit = form.handleSubmit((data) => {});

  if (isLoadingAuthors || !authors || isLoadingGenres || !genres)
    return <div>Loading...</div>;

  return (
    <div>
      <div>Create a new book...</div>
      <Input {...form.register('title')} placeholder='Title' />
      <Select
        placeholder='Author...'
        onChange={(value) => {
          if (!value) return;
          form.setValue('author', value);
        }}
        value={form.watch().author}
        options={authors.map((author) => ({
          label: author.name,
          value: author.id,
        }))}
      />

      <Select
        isMulti
        placeholder='Genres...'
        onChange={(value) => {
          if (!value) return;
          form.setValue('genres', [...value]);
        }}
        value={form.watch().genres}
        options={genres.map((genre) => ({
          label: genre.name,
          value: genre.id,
        }))}
      />
      <Input {...form.register('ISBN')} placeholder='9780136019701' />
      <Input {...form.register('publishedAt')} placeholder='Published At' />
    </div>
  );
};
