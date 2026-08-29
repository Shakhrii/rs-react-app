import type { RefetchButtonProps } from '../../types/types';

export const RefetchButton = ({ refetchHandler }: RefetchButtonProps) => {
  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-5"
      onClick={refetchHandler}
    >
      Refetch
    </button>
  );
};
