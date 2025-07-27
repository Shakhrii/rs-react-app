import type { ButtonArrowProps } from '../../../types/types';

export function ButtonLeftArrow({ onClick }: ButtonArrowProps) {
  return (
    <button
      onClick={() => onClick()}
      type="button"
      className="text-white bg-amber-500 hover:bg-amber-400
        font-medium rounded-lg text-sm p-2.5 text-center 
        inline-flex items-center me-2 active:bg-amber-300"
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
