import { type HTMLAttributes, useState, forwardRef } from 'react';
import { MenuItemContext } from './MenuItemContext';
import { cn } from '~/utils/tailwind';

export type MenuItemProps = HTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  disabled?: boolean;
  compact?: boolean;
  noPadding?: boolean;
  color?: 'primary' | 'danger';
};

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  (props, ref) => {
    const { selected, disabled, compact, noPadding, children, ...divProps } =
      props;
    const [isHovered, setHovered] = useState(false);

    return (
      <MenuItemContext.Provider value={{ isHovered, setHovered }}>
        <button
          {...divProps}
          ref={ref} // Forward the ref here
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={disabled ? undefined : props.onClick}
          disabled={disabled}
          className={cn(
            'relative flex w-full flex-row items-center gap-1 rounded bg-bkg-paper text-left text-txt hover:bg-bkg disabled:opacity-50',
            props.disabled ? 'cursor-default' : 'cursor-pointer',
            noPadding ? '' : compact ? 'p-1' : 'px-2 py-3',
            selected &&
              !disabled &&
              'bg-primary text-primary-contrastText hover:bg-primary',
            props.color === 'danger' ? 'hover:text-red-500' : '',
            props.className
          )}
        >
          {children}
        </button>
      </MenuItemContext.Provider>
    );
  }
);

MenuItem.displayName = 'MenuItem';
