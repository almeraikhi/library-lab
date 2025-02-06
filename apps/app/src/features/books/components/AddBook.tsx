import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/Button';

export const AddBook = () => {
  const navigate = useNavigate();
  const navigateToAddBook = () => {
    navigate('/books/add');
  };

  return (
    <Button className='flex-1' onClick={navigateToAddBook}>
      Add Book
    </Button>
  );
};
