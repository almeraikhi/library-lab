import { CreateBookInput } from '@repo/prisma/dtos/books.dto';
import { useForm } from 'react-hook-form';
import { Input } from '~/components/Input';
import { Select } from '~/components/Select';
import { useGetAuthors } from '~/features/authors/api/getAuthors';

export const CreateBook = () => {
  const { data: authors, isLoading: isLoadingAuthors } = useGetAuthors();

  const form = useForm<CreateBookInput>({
    defaultValues: {
      title: '',
      authorId: '',
      genresIds: [],
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
        options={authors.map((author) => ({
          label: author.name,
          value: author.id,
        }))}
      />
      <Input {...form.register('authorId')} placeholder='Author ID' />
      <Input {...form.register('genresIds')} placeholder='Genres IDs' />
      <Input {...form.register('ISBN')} placeholder='ISBN' />
      <Input {...form.register('publishedAt')} placeholder='Published At' />
    </div>
  );
};
