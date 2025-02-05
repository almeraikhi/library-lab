import { cn } from '~/utils/tailwind';
import { useMenuItemContext } from './useMenuItemContext';

export type MenuItemOptionsProps = {
  show?: boolean;
  hide?: boolean;
  children: React.ReactNode;
};
export const MenuItemOptions = (props: MenuItemOptionsProps) => {
  const { children, show, hide } = props;
  const { isHovered } = useMenuItemContext();
  return (
    <div
      className={cn(
        'absolute right-0 flex flex-row  pr-1',
        hide ? 'opacity-0' : isHovered || show ? 'opacity-100' : 'opacity-0'
      )}
    >
      {children}
    </div>
  );
};
