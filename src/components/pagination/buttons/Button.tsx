import { useTheme } from '../../../hooks/useTheme';
import type { ButtonProps } from '../../../types/types';

export function Button({ onClick, children }: ButtonProps) {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={`py-2.5 px-5 text-sm font-medium
     text-gray-900 focus:outline-none
       rounded-lg border-2 hover:bg-[var(--accent-color-light)] cursor-pointer
       focus:z-10 focus:ring-4 focus:ring-gray-100 text-center 
       ${
         theme === 'dark'
           ? 'bg-[var(--accent-color-dark)] border-none text-white'
           : 'border-[var(--accent-color-light)] bg-white'
       }`}
    >
      {children}
    </button>
  );
}
