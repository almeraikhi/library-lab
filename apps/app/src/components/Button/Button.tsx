import { HTMLAttributes } from 'react';
import { cn } from '~/utils/tailwind/cn';

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {};

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        props.className,
        'bg-primary text-primary-contrastText rounded-md p-2 min-w-fit w-full'
      )}
    >
      {children}
    </button>
  );
};
