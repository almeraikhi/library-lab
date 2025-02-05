import { Button } from '~/components/Button';
import { useNavigate } from 'react-router-dom';

export const NotFoundRoute = () => {
  const navigate = useNavigate();
  const routeToHome = () => {
    navigate('/');
  };

  return (
    <div className='w-full h-screen bg-background flex items-center justify-center'>
      <div className='bg-background-paper p-4 rounded-lg flex flex-col gap-4'>
        <div className='text-2xl font-bold'>Oh-uh!</div>
        <div className='text-lg'>
          The page you are looking for does not exist.
        </div>
        <Button onClick={routeToHome}>Go Back</Button>
      </div>
    </div>
  );
};
