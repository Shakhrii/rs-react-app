import type { ButtonProps } from '../../../types/types';

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className="py-2.5 px-5 text-sm font-medium
     text-gray-900 focus:outline-none bg-white 
       rounded-lg border border-amber-500
     hover:bg-gray-100 hover:text-amber-500 
       focus:z-10 focus:ring-4 focus:ring-gray-100 text-center"
    >
      {children}
    </button>
  );
}
