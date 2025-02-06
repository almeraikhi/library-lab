import { useRef, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Tab } from '../Tabs/Tab';
import { BooksActions } from '~/features/books/components/BooksActions';

export const MainLayout = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    // Update on mount
    updateHeaderHeight();

    // Update on window resize (assuming header size might change with window width)
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <div className='flex flex-col w-full h-screen items-center'>
      <div className='relative flex flex-col gap-2 w-full h-full items-center'>
        <header
          ref={headerRef}
          className='fixed top-0 left-0 flex flex-col gap-2 w-full px-4 py-2 z-50 bg-background-paper justify-center items-center'
        >
          <div className='flex flex-col gap-2 w-full md:max-w-screen-lg'>
            <nav className='flex gap-2 w-full'>
              <Tab to='/books'>Books</Tab>
              <Tab to='/authors'>Authors</Tab>
              <Tab to='/genres'>Genres</Tab>
            </nav>

            {location.pathname === '/books' && <BooksActions />}
          </div>
        </header>
        <main className='flex flex-col relative flex-1 gap-2 w-full pt-12 md:max-w-screen-lg'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
