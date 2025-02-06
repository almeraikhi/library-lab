import { Button } from '~/components/Button';
import { useCountBooks } from '../api/useCountBooks';
import { useBookStore } from '../stores/booksStore';

export const BooksPagination = () => {
  const { authorId, genresIds, page, setPage } = useBookStore();
  const { data } = useCountBooks({ authorId, genresIds });

  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / 10); // Assuming 10 items per page

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div className='flex items-center justify-end gap-2'>
        <div>
          {(page - 1) * 10 + 1}-{Math.min(page * 10, totalCount)} of{' '}
          {totalCount}
        </div>
        <div className='flex items-center gap-2'>
          <Button onClick={handlePrevious} disabled={page === 1}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
