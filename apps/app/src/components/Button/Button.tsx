import { HTMLAttributes } from 'react';
import { cn } from '~/utils/tailwind/cn';

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
};

export const Button = ({ children, disabled, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        props.className,
        'bg-primary text-primary-contrastText rounded-md p-2 min-w-fit w-full',
        disabled ? 'bg-gray-400 opacity-50' : ''
      )}
    >
      {children}
    </button>
  );
};
