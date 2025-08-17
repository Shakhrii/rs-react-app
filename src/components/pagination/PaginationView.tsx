'use client';

import { useEffect, useState } from 'react';
import { Button } from './buttons/Button';
import { ButtonDisabled } from './buttons/ButtonDisabled';
import { ButtonLeftArrow } from './buttons/ButtonLeftArrow';
import { ButtonRightArrow } from './buttons/ButtonRightArrow';
import { COUNT_KEY, LIMIT } from '../../utils/contstants';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getCookieAction } from '../../../actions/get-cookie';

type PaginationViewProps = {
  limit: number;
  count: number;
  isVisible: boolean;
};

export function PaginationView({
  count,
  limit,
  isVisible,
}: PaginationViewProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams?.get('page')) || 1
  );

  const createPageURL = (pageNumber: number | string) => {
    console.log(`page number = ${pageNumber}`);
    const params = new URLSearchParams(searchParams || '');
    params.set('page', pageNumber.toString());
    console.log(params.toString());
    return `${pathname}?${params.toString()}`;
  };

  const firstPage = 1;
  let pages = 0;
  if (count > 0) {
    pages = Math.floor(count / limit) + (count % limit > 0 ? 1 : 0);
  }

  useEffect(() => {
    const path = createPageURL(currentPage);
    replace(path);
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
