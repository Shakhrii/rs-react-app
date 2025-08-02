import { useRef, useState } from 'react';
import { useAppSelector } from '../../store/store';
import { selectSelectedItems } from '../../store/slices/selectedItems.slice';
import { convertToCSV } from '../../utils/utils';

export const ButtonDownload = () => {
  const [url, setUrl] = useState('');
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const items = useAppSelector(selectSelectedItems);

  const handleDownload = () => {
    const fileText = convertToCSV(items);
    const blob = new Blob([fileText], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);

    setUrl(url);

    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        URL.revokeObjectURL(url);
        setUrl('');
      }
    }, 0);
  };

  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 
      focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
      text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 
      dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleDownload}
      >
        Download all
      </button>
      <a
        ref={downloadRef}
        href={url}
        style={{ display: 'none' }}
        download={`${items.length}_items.csv`}
      >
        Download
      </a>
    </>
  );
};
