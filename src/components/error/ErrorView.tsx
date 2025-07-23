import corruptedFile from '../../assets/images/corrupted-file.png';
import type { ErrorViewProps } from '../../types/types';

export function ErrorView({
  message,
  buttonText,
  clickHandler,
}: ErrorViewProps) {
  return (
    <div className="w-1/2 flex flex-col gap-5 items-center justify-center">
      <div className="w-50 h-50 self-center opacity-70">
        <img src={corruptedFile} alt="empty"></img>
      </div>
      <span className="text-neutral-400">{message}</span>
      {clickHandler && (
        <button
          type="button"
          onClick={() => {
            if (clickHandler) clickHandler();
          }}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
