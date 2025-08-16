import type { MenuItemProps } from '../../../types/types';
import Link from 'next/link';

export function MenuItem({ value, path, isActive }: MenuItemProps) {
  return (
    <Link
      href={path}
      className={`inline-block p-4 border-b-2  rounded-t-lg ${
        isActive
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'
      }`}
    >
      {value}
    </Link>
  );
}
