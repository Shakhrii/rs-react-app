import { useEffect, useState, type ChangeEvent } from 'react';
import type { SearchViewProps } from '../../types/types';
import { useTheme } from '../../hooks/useTheme';

export function SearchView({ value, onSearchClick }: SearchViewProps) {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    if (!searchTerm) {
      handleClick();
    }
  }, [searchTerm]);

  function handleChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value.toString().trim();
    setSearchTerm(inputValue);
  }

  function handleClick() {
    onSearchClick(searchTerm || '');
  }

  return (
    <div className="flex gap-2">
      <input
        className={`border-2 border-solid rounded-md p-1.5
        text-neutral-500 placeholder:text-neutral-300 
          focus:outline-0 hover:border-amber-400
        focus:border-amber-400 bg-white 
        ${
          theme === 'dark'
            ? 'border-[var(--accent-color-dark)]'
            : 'border-[var(--accent-color-light)]'
        }`}
        type="text"
        placeholder="type name or id... "
        value={searchTerm || ''}
        onChange={(event) => handleChangeEvent(event)}
      />
      <button
        onClick={() => handleClick()}
        className={`px-3 rounded-md hover:bg-amber-400 text-sm 
          ${
            theme === 'dark'
              ? 'bg-[var(--accent-color-dark)]'
              : 'bg-[var(--accent-color-light)]'
          }`}
      >
        Search
      </button>
    </div>
  );
}
