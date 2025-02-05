import { createContext } from 'react';

// Create a Context for the hover state
export interface MenuItemContext {
  isHovered: boolean;
  setHovered: (hovered: boolean) => void;
}

export const MenuItemContext = createContext<MenuItemContext | undefined>(
  undefined
);
