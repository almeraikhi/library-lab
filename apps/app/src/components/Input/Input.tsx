import { forwardRef } from 'react';
import { cn } from '~/utils/tailwind';

export type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  compact?: boolean;
};

// forwrdRef is used to pass ref to the input element
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, compact, disabled, ...rest } = props;
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded border-none bg-background text-text focus:outline-none',
        compact ? 'p-1' : 'p-2',
        disabled && 'opacity-50',
        className
      )}
      autoComplete='off'
      {...rest}
    />
  );
});

Input.displayName = 'Input';
