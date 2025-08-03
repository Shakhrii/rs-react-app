import { useTheme } from '../../../hooks/useTheme';
import type { ButtonArrowProps } from '../../../types/types';

export function ButtonLeftArrow({ onClick }: ButtonArrowProps) {
  const { theme } = useTheme();
  return (
    <button
      onClick={() => onClick()}
      type="button"
      className={`hover:bg-amber-400 cursor-pointer
        font-medium rounded-lg text-sm p-2.5 text-center 
        inline-flex items-center me-2 active:bg-amber-300 ${theme === 'dark' ? 'bg-[var(--accent-color-dark)]' : 'bg-[var(--accent-color-light)]'}`}
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 5H1m0 0 4 4M1 5l4-4"
        />
      </svg>
    </button>
  );
}
