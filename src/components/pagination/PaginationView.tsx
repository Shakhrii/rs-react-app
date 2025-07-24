import { useState } from 'react';
import { Button } from './buttons/Button';
import { ButtonDisabled } from './buttons/ButtonDisabled';
import { ButtonLeftArrow } from './buttons/ButtonLeftArrow';
import { ButtonRightArrow } from './buttons/ButtonRightArrow';

type PaginationViewProps = {
  limit: number;
  count: number;
};

export function PaginationView({ count, limit }: PaginationViewProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const firstPage = 1;
  let pages = 0;
  if (count > 0) {
    pages = Math.floor(count / limit) + (count % limit > 0 ? 1 : 0);
  }

  function nextPage() {
    setCurrentPage((prev) => prev + 1);
  }

  function prevPage() {
    setCurrentPage((prev) => prev - 1);
  }

  return (
    <div className="flex flex-row items-center justify-center gap-3">
      {currentPage != firstPage && (
        <>
          <ButtonLeftArrow onClick={() => prevPage()} />
          <Button onClick={() => setCurrentPage(1)}>{firstPage}</Button>
        </>
      )}
      {currentPage != firstPage && currentPage != firstPage + 1 && (
        <span> ... </span>
      )}
      <ButtonDisabled>{currentPage}</ButtonDisabled>
      {currentPage != pages && currentPage != pages - 1 && <span> ... </span>}
      {currentPage != pages && (
        <>
          <Button onClick={() => setCurrentPage(pages)}>{pages}</Button>
          <ButtonRightArrow onClick={() => nextPage()} />
        </>
      )}
    </div>
  );
}
