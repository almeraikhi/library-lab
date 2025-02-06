import { Outlet } from 'react-router-dom';
import { Tab } from '../Tabs/Tab';

export const MainLayout = () => {
  return (
    <div>
      <header>
        <h1>Books Application</h1>
        <nav className='flex gap-2'>
          <Tab to='/books'>Books</Tab>
          <Tab to='/authors'>Authors</Tab>
          <Tab to='/genres'>Genres</Tab>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>{/* Optional footer */}</footer>
    </div>
  );
};
