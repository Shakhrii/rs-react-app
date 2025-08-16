'use client';

import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        checked={theme === 'dark'}
        className="sr-only peer"
        onChange={handleChangeTheme}
      />
      <div
        className={`
          relative w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 
          after:content-[''] after:absolute after:top-[2px] after:rounded-full 
          after:h-5 after:w-5 after:transition-all
          ${
            theme === 'dark'
              ? 'bg-gray-700 peer-focus:ring-gray-600 peer-checked:bg-gray-600 after:start-[calc(100%-2px)] after:-translate-x-full after:bg-gray-300'
              : 'bg-gray-200 peer-focus:ring-blue-300 peer-checked:bg-blue-600 after:start-[2px] after:bg-white after:border after:border-gray-300'
          }
        `}
      ></div>
      <span
        className={`ms-3 text-sm font-medium ${theme === 'dark' ? 'text-white' : ' text-gray-900'}`}
      >
        {theme}
      </span>
    </label>
  );
};
