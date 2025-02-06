import { useContext } from 'react';
import { MenuItemContext } from './MenuItemContext';

export const useMenuItemContext = () => {
  const context = useContext(MenuItemContext);
  if (!context) {
    throw new Error('useMenuItemContext must be used within a MenuItem');
  }
  return context;
};
