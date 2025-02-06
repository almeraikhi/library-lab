import { useMemo } from 'react';
import { Loading } from '~/components/Loading';
import { Select } from '~/components/Select';
import { useGetAuthors } from '~/features/authors/api/getAuthors';
import { useGetGenres } from '~/features/genres/api/getGenres';
import { useBookStore } from '../stores/booksStore';
import { AddBook } from './AddBook';

export const BooksActions = () => {
  const { data: authors, isLoading: isLoadingAuthors } = useGetAuthors();
  const { data: genres, isLoading: isLoadingGenres } = useGetGenres();
  const { setAuthorId, authorId, setGenresIds, genresIds } = useBookStore();

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

  if (isLoadingAuthors || isLoadingGenres || !authors || !genres) {
    return <Loading />;
  }

  return (
    <div className='flex md:flex-row flex-col gap-2 w-full justify-center items-center h-full'>
      <Select
        placeholder='Select Author...'
        isClearable
        onChange={(value) => {
          if (!value) {
            setAuthorId(undefined);
          } else {
            setAuthorId(value.value);
          }
        }}
        value={selectedAuthor ?? null}
        options={authors.map((author) => ({
          label: author.name,
          value: author.id,
        }))}
      />
      <Select
        placeholder='Select Genre...'
        isMulti
        isClearable
        onChange={(value) => {
          if (!value) return;
          const ids = value.map((genre) => genre.value);
          setGenresIds(ids);
        }}
        value={selectedGenres ?? null}
        options={genres.map((genre) => ({
          label: genre.name,
          value: genre.id,
        }))}
      />
      <AddBook />
    </div>
  );
};
