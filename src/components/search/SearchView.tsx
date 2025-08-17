'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SEARCH_TERM_KEY } from '../../utils/contstants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function SearchView() {
  const { theme } = useTheme();
  const [termLS, setTermLS] = useLocalStorage('', SEARCH_TERM_KEY);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    router.push(`/pokemons?search=${encodeURIComponent(termLS)}`);
  }, [termLS]);

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
    const params = new URLSearchParams(searchParams || '');
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
    setTermLS(searchTerm);
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
