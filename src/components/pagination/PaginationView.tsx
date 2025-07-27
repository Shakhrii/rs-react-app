import { useEffect, useState } from 'react';
import { Button } from './buttons/Button';
import { ButtonDisabled } from './buttons/ButtonDisabled';
import { ButtonLeftArrow } from './buttons/ButtonLeftArrow';
import { ButtonRightArrow } from './buttons/ButtonRightArrow';
import { useSearchParams } from 'react-router';
import { LIMIT } from '../../utils/contstants';

type PaginationViewProps = {
  limit: number;
  count: number;
  onPageChanged: (offset: number) => void;
  isVisible: boolean;
};

export function PaginationView({
  count,
  limit,
  onPageChanged,
  isVisible,
}: PaginationViewProps) {
  const [paginationParam, setPaginationParam] = useSearchParams();
  const page = paginationParam.get('page');
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);

  const firstPage = 1;
  let pages = 0;
  if (count > 0) {
    pages = Math.floor(count / limit) + (count % limit > 0 ? 1 : 0);
  }

  useEffect(() => {
    if (!isVisible && paginationParam.has('page')) {
      paginationParam.delete('page');
      setPaginationParam(paginationParam);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) {
      paginationParam.delete('page');
      setPaginationParam(paginationParam);
    } else {
      if (currentPage <= pages) {
        const offset = (currentPage - 1) * LIMIT;
        onPageChanged(offset);
        paginationParam.set('page', String(currentPage));
        setPaginationParam(paginationParam);
      } else {
        setCurrentPage(1);
      }
    }
  }, [currentPage, isVisible]);

  return (
    <div
      style={{ display: isVisible ? 'flex' : 'none' }}
      className="flex flex-row items-center justify-center gap-3"
    >
      {currentPage != firstPage && (
        <>
          <ButtonLeftArrow onClick={() => setCurrentPage((prev) => prev - 1)} />
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
          <ButtonRightArrow
            onClick={() => setCurrentPage((prev) => prev + 1)}
          />
        </>
      )}
    </div>
  );
}
