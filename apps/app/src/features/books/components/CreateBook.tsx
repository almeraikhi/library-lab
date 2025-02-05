import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Select } from '~/components/Select';
import { useGetAuthors } from '~/features/authors/api/getAuthors';
import { useGetGenres } from '~/features/genres/api/getGenres';
import { useCreateBook } from '../api/createBook';

// https://www.isbnservices.com/isbn-10-vs-isbn-13/

const SelectOptionSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: SelectOptionSchema.refine((data) => data.value, {
    message: 'Author is required',
  }),
  genres: z.array(SelectOptionSchema).min(1, 'At least one genre is required'),
  ISBN: z.string().min(13, 'ISBN is required'),
  publishedAt: z
    .date()
    .min(new Date('1440-01-01'), 'Published at date is required'),
});

type CreateBookFormInput = z.infer<typeof createBookSchema>;

export const CreateBook = () => {
  const { data: authors, isLoading: isLoadingAuthors } = useGetAuthors();
  const { data: genres, isLoading: isLoadingGenres } = useGetGenres();
  const { mutate: createBook, isLoading: isCreatingBook } = useCreateBook();

  const form = useForm<CreateBookFormInput>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: '',
      author: undefined,
      genres: [],
      ISBN: '',
      publishedAt: new Date(),
    },
  });

  const {
    formState: { errors },
  } = form;

  const submit = form.handleSubmit((data) => {
    console.log(data);
    console.log('creating book...');
    createBook({
      ...data,
      authorId: data.author.value,
      genresIds: data.genres.map((genre) => genre.value),
    });
  });

  if (isLoadingAuthors || !authors || isLoadingGenres || !genres)
    return <div>Loading...</div>;

  return (
    <div>
      <div>Create a new book...</div>
      <div>Title</div>
      <Input {...form.register('title')} />
      <div className='text-red-500'>{errors.title?.message}</div>
      <div>Author</div>
      <Select
        onChange={(value) => {
          if (!value) return;
          form.setValue('author', value, { shouldValidate: true });
        }}
        value={form.watch().author}
        options={authors.map((author) => ({
          label: author.name,
          value: author.id,
        }))}
      />
      <div className='text-red-500'>{errors.author?.message}</div>
      <div>Genres</div>
      <Select
        isMulti
        onChange={(value) => {
          if (!value) return;
          form.setValue('genres', [...value], { shouldValidate: true });
        }}
        value={form.watch().genres}
        options={genres.map((genre) => ({
          label: genre.name,
          value: genre.id,
        }))}
      />
      <div className='text-red-500'>{errors.genres?.message}</div>
      <Input {...form.register('ISBN')} placeholder='9780136019701' />
      <div className='text-red-500'>{errors.ISBN?.message}</div>
      <Input {...form.register('publishedAt')} placeholder='Published At' />
      <div className='text-red-500'>{errors.publishedAt?.message}</div>
      <Button onClick={submit}>Add Book</Button>
    </div>
  );
};
