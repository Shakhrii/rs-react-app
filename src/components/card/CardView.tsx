'use client';

import type { CardViewProps } from '../../types/types';
import { useTheme } from '../../hooks/useTheme';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  selected,
  selectSelectedItemIds,
  unselected,
} from '../../../lib/features/selectedItems/selectedItems.slice';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export function CardView({ pokemon }: CardViewProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const selectedIds = useAppSelector(selectSelectedItemIds);
  const isSelected = () => {
    return selectedIds.includes(pokemon.id);
  };

  const handleSelect = () => {
    if (isSelected()) {
      removeSelected();
    } else {
      addSelected();
    }
  };

  const addSelected = () => {
    dispatch(selected(pokemon));
  };

  const removeSelected = () => {
    dispatch(unselected(pokemon));
  };

  function handleClick() {
    const params = new URLSearchParams(searchParams || '');
    params.set('id', pokemon.id.toString());
    router.push(`${pathname}?${params.toString()}`);
  }
  return (
    <div
      onClick={handleClick}
      data-testid="card-item"
      className={`w-50 flex flex-col items-start shadow
      hover:bg-amber-500/50 rounded-sm transition-color
        duration-300 ease-in-out active:bg-amber-500 
        ${theme === 'dark' ? 'bg-[var(--bg-card-color-dark)]' : 'bg-white'}`}
    >
      <Image
        className="w-full h-2/3"
        width={96}
        height={96}
        src={pokemon.avatar}
        alt="pokemon avatar"
      />
      <div className="flex flex-col items-start p-5">
        <span data-testid="card-name" className="text-sm">
          <span className="font-bold">name: </span>
          {pokemon.name}
        </span>
        <span className="text-sm">
          <span className="font-bold">height: </span>
          {pokemon.height}
        </span>
        <span className="text-sm">
          <span className="font-bold">weight: </span>
          {pokemon.weight}
        </span>
        <div className="flex gap-2.5 items-center mt-6">
          <input
            type="checkbox"
            checked={isSelected()}
            onClick={(e) => e.stopPropagation()}
            onChange={handleSelect}
          />
          <label>add to download</label>
        </div>
      </div>
    </div>
  );
}
