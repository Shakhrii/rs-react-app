import { useNavigate } from 'react-router';
import type { CardViewProps } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectSelectedItemIds } from '../../store/slices/selectedItems.slice';
import { useEffect, useState } from 'react';
import { selected, unselected } from '../../store/slices/selectedItems.slice';

export function CardView({ pokemon }: CardViewProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSelected = () => {
    return selectedIds.includes(pokemon.id);
  };

  const selectedIds = useAppSelector(selectSelectedItemIds);
  const [isSelect, setSelected] = useState(isSelected());

  const handleSelect = () => {
    setSelected(!isSelect);
  };

  useEffect(() => {
    if (isSelect) {
      addSelected();
    } else {
      removeSelected();
    }
  }, [isSelect]);

  const addSelected = () => {
    dispatch(selected({ id: pokemon.id }));
  };

  const removeSelected = () => {
    dispatch(unselected({ id: pokemon.id }));
  };

  function handleClick() {
    const searchParams = new URLSearchParams(window.location.search);
    navigate(`${pokemon.id}?${searchParams.toString()}`);
  }
  return (
    <div
      onClick={handleClick}
      data-testid="card-item"
      className="w-50 flex flex-col items-start shadow
      hover:bg-amber-500/50 rounded-sm transition-colors 
        duration-300 ease-in-out active:bg-amber-500 bg-white"
    >
      <img
        className="w-full h-2/3"
        src={pokemon.avatar}
        alt="pokemon avatar"
      ></img>
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
        <input
          type="checkbox"
          checked={isSelect}
          onClick={(e) => e.stopPropagation()}
          onChange={handleSelect}
        />
      </div>
    </div>
  );
}
