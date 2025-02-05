import React from 'react';
import { Link } from 'react-router-dom';

interface Crumb {
  label: string;
  path?: string; // If provided, this item will be rendered as a link.
}

interface BreadcrumbProps {
  items: Crumb[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='flex space-x-2'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center'>
            {item.path ? (
              <Link to={item.path} className='text-blue-500 hover:underline'>
                {item.label}
              </Link>
            ) : (
              <span className='text-gray-500'>{item.label}</span>
            )}
            {index < items.length - 1 && <span className='mx-2'>{'>'}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
