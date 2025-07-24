import type { ButtonProps } from '../../../types/types';

export function ButtonDisabled({ children }: ButtonProps) {
  return (
    <button
      type="button"
      className="text-neutral-800 bg-white cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      disabled
    >
      {children}
    </button>
  );
}
