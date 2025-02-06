import { cn } from '@oent/utils/tailwind';

export type MenuItemInfoProps = React.ComponentPropsWithoutRef<'div'>;

export const MenuItemInfo = (props: MenuItemInfoProps) => {
  const { children, className, ...rest } = props;
  return (
    <div {...rest} className={cn('ml-auto opacity-80 pr-1', className)}>
      {children}
    </div>
  );
};
