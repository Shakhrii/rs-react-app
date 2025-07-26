import { NavLink } from 'react-router';
import type { MenuItemProps } from '../../../types/types';

export function MenuItem({ value, path }: MenuItemProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `inline-block p-4 border-b-2  rounded-t-lg ${
          isActive
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent hover:text-gray-600 hover:border-gray-300'
        }`
      }
    >
      {value}
    </NavLink>
  );
}
