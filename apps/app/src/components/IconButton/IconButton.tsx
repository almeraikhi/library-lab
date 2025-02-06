import { forwardRef, ForwardedRef } from 'react';
import { cn } from '~/utils/tailwind';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  compact?: boolean;
  active?: boolean;
  blend?: boolean;
}

export const IconButton = forwardRef(
  (props: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { active, disabled, compact, blend = false } = props;
    return (
      <button
        {...props}
        ref={ref}
        onClick={(event) => {
          if (disabled) return;
          event.stopPropagation();
          props.onClick && props.onClick(event);
        }}
        style={{ mixBlendMode: blend ? 'plus-lighter' : 'normal' }}
        className={cn(
          'flex items-center rounded disabled:opacity-50',
          compact ? '' : 'p-1',
          active
            ? 'cursor-pointer bg-primary text-primary-contrastText '
            : disabled
              ? 'cursor-default'
              : 'cursor-pointer text-txt  hover:bg-bkg',
          props.className
        )}
      />
    );
  }
);

IconButton.displayName = 'IconButton';
