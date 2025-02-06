import { HTMLAttributes } from 'react';
import { cn } from '~/utils/tailwind';
import { NavLink } from 'react-router-dom';

export type TabProps = HTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  to: string;
  children: React.ReactNode;
};

export const Tab = ({ to, children }: TabProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn('py-1 px-3 rounded-full', isActive && 'bg-primary text-white')
      }
    >
      {children}
    </NavLink>
  );
};
