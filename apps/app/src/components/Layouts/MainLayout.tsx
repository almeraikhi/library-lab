import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Tab } from '../Tabs/Tab';
import { BooksActions } from '~/features/books/components/BooksActions';

export const MainLayout = () => {
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        console.log('a resize was triggered');
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current); // Observe the header element
    }

    return () => {
      resizeObserver.disconnect(); // Cleanup observer
    };
  }, [location]); // Update height when location changes

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
            </nav>

            {location.pathname === '/books' && <BooksActions />}
          </div>
        </header>
        <main
          className={`flex flex-col relative flex-1 gap-2 w-full md:max-w-screen-lg`}
          style={{
            paddingTop: headerHeight,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
