import { CreateBookInput } from '@repo/prisma/dtos/books.dto';
import { useForm } from 'react-hook-form';
import { Input } from '~/components/Input';
import { Select } from '~/components/Select';
import { useGetAuthors } from '~/features/authors/api/getAuthors';

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

  const form = useForm<CreateBookFormInput>({
    defaultValues: {
      title: '',
      author: undefined,
      genres: [],
      ISBN: '',
      publishedAt: new Date(),
    },
  });

  if (isLoadingAuthors || !authors) return <div>Loading...</div>;

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
      {/* <Input {...form.register('authorId')} placeholder='Author ID' /> */}
      {/* <Input {...form.register('genresIds')} placeholder='Genres IDs' /> */}
      <Input {...form.register('ISBN')} placeholder='ISBN' />
      <Input {...form.register('publishedAt')} placeholder='Published At' />
    </div>
  );
};
