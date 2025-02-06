import { useCreateBook } from '~/features/books/api/createBook';
import { BookForm } from '~/features/books/components/BookForm';

export const CreateBookRoute = () => {
  const { mutate: createBook } = useCreateBook();

  return (
    <BookForm
      onSubmit={(data, form) => {
        createBook(data, {
          onSuccess: () => {
            form.reset();
          },
        });
      }}
    />
  );
};
