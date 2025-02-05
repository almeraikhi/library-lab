import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBookInput, CreateBookSchema } from '@repo/prisma/dtos/books.dto';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Select } from '~/components/Select';
import { useGetAuthors } from '~/features/authors/api/getAuthors';
import { useGetGenres } from '~/features/genres/api/getGenres';
import { useCreateBook } from '../api/createBook';

export type BookFormProps = {
  defaultValues?: CreateBookInput;
  onSubmit: (data: CreateBookInput) => void;
};

export const BookForm = (props: BookFormProps) => {
  const { defaultValues } = props;

  const { data: authors, isLoading: isLoadingAuthors } = useGetAuthors();
  const { data: genres, isLoading: isLoadingGenres } = useGetGenres();
  const { mutate: createBook, isLoading: isCreatingBook } = useCreateBook();

  const form = useForm<CreateBookInput>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: defaultValues ?? {
      title: '',
      authorId: undefined,
      genresIds: [],
      ISBN: '',
      publishedAt: new Date(),
    },
  });

  const {
    formState: { errors },
  } = form;

  const authorId = form.watch('authorId');
  const genresIds = form.watch('genresIds');

  const selectedAuthor = useMemo(() => {
    const author = authors?.find((author) => author.id === authorId);
    return author ? { label: author.name, value: author.id } : undefined;
  }, [authors, authorId]);

  const selectedGenres = useMemo(() => {
    const selected = genres?.filter((genre) => genresIds.includes(genre.id));
    return selected?.map((genre) => ({
      label: genre.name,
      value: genre.id,
    }));
  }, [genres, genresIds]);

  const submit = form.handleSubmit((data) => {
    props.onSubmit(data);
  });

  if (isLoadingAuthors || !authors || isLoadingGenres || !genres)
    return <div>Loading...</div>;

  return (
    <div>
      <div>Title</div>
      <Input {...form.register('title')} disabled={isCreatingBook} />
      <div className='text-red-500'>{errors.title?.message}</div>
      <div>Author</div>
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
      <div className='text-red-500'>{errors.authorId?.message}</div>
      <div>Genres</div>
      <Select
        isMulti
        onChange={(value) => {
          if (!value) return;
          const ids = value.map((genre) => genre.value);
          form.setValue('genresIds', ids, { shouldValidate: true });
        }}
        value={selectedGenres ?? null}
        options={genres.map((genre) => ({
          label: genre.name,
          value: genre.id,
        }))}
      />
      <div className='text-red-500'>{errors.genresIds?.message}</div>
      <Input {...form.register('ISBN')} placeholder='9780136019701' />
      <div className='text-red-500'>{errors.ISBN?.message}</div>
      <Input {...form.register('publishedAt')} placeholder='Published At' />
      <div className='text-red-500'>{errors.publishedAt?.message}</div>
      <Button onClick={submit}>Add Book</Button>
    </div>
  );
};
