import { useNavigate } from 'react-router';
import type { CardViewProps } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectSelectedItemIds } from '../../store/slices/selectedItems.slice';
import { selected, unselected } from '../../store/slices/selectedItems.slice';

export function CardView({ pokemon }: CardViewProps) {
  const navigate = useNavigate();
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
