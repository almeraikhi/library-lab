import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/Button';

export const AddBook = () => {
  const navigate = useNavigate();
  const navigateToAddBook = () => {
    navigate('/books/add');
  };

  return (
    <div className='flex flex-col gap-2 w-full justify-center items-center h-full'>
      <Button onClick={navigateToAddBook}>Add Book...</Button>
    </div>
  );
};
