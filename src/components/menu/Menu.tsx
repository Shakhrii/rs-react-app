import { usePathname } from 'next/navigation';
import type { MenuProps } from '../../types/types';
import { MenuItem } from './menu-item/MenuItem';

export function Menu({ items }: MenuProps) {
  const pathName = usePathname();
  return (
    <ul className="flex flex-wrap -mb-px items-center justify-center gap-2">
      {items.map((item) => (
        <li key={item.value}>
          <MenuItem
            value={item.value}
            path={item.path}
            isActive={pathName === item.path}
          />
        </li>
      ))}
    </ul>
  );
}
