import { Outlet } from 'react-router-dom';
import { Tab } from '../Tabs/Tab';

export const MainLayout = () => {
  return (
    <div className='flex flex-col w-full h-screen items-center'>
      <div className='flex flex-col gap-2 w-full h-full items-center'>
        <header className='py-2 px-4 max-w-screen-lg'>
          <nav className='flex gap-2 md:max-w-screen-lg w-full h-full'>
            <Tab to='/books'>Books</Tab>
            <Tab to='/authors'>Authors</Tab>
            <Tab to='/genres'>Genres</Tab>
          </nav>
        </header>
        <main className='flex flex-col relative flex-1 overflow-auto gap-2'>
          <Outlet />
        </main>
        <footer>{/* Optional footer */}</footer>
      </div>
    </div>
  );
};
