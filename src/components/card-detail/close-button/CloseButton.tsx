import { useNavigate } from 'react-router';
import { PAGE_ROUTES } from '../../../utils/contstants';

export function CloseButton() {
  const searchParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() =>
        navigate(`${PAGE_ROUTES.POKEMONS}?${searchParams.toString()}`)
      }
      className="absolute top-5 right-5 text-white rounded-b-full z-99"
    >
      <svg
        className="w-[36px] h-[36px] text-amber-500 hover:text-amber-300 hover:cursor-pointer"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
          d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>
  );
}
