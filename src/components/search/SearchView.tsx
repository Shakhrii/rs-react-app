import { useEffect, useState, type ChangeEvent } from 'react';
import type { SearchViewProps } from '../../types/types';

export function SearchView({ value, onSearchClick }: SearchViewProps) {
  const [seatchTerm, setSearchTerm] = useState(value);

  function handleChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value.toString().trim();
    setSearchTerm(inputValue);
  }

  useEffect(() => {
    if (!seatchTerm) {
      handleClick();
    }
  }, [seatchTerm]);

  function handleClick() {
    onSearchClick(seatchTerm || '');
  }

  return (
    <div className="flex gap-2">
      <input
        className="border-2 border-solid
          border-amber-500 rounded-md p-1.5
          text-neutral-500 placeholder:text-neutral-300 
          focus:outline-0 hover:border-amber-400
            focus:border-amber-400 bg-white"
        type="text"
        placeholder="type name or id... "
        value={seatchTerm || ''}
        onChange={(event) => handleChangeEvent(event)}
      />
      <button
        onClick={() => handleClick()}
        className="bg-amber-500 px-3 rounded-md text-white hover:bg-amber-400 text-sm"
      >
        Search
      </button>
    </div>
  );
}
