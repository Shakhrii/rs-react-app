import { Button } from './buttons/Button';
import { ButtonDisabled } from './buttons/ButtonDisabled';
import { ButtonLeftArrow } from './buttons/ButtonLeftArrow';
import { ButtonRightArrow } from './buttons/ButtonRightArrow';

type PaginationViewProps = {
  limit: number;
  count: number;
};

export function PaginationView({ count, limit }: PaginationViewProps) {
  const currentPage = 1;
  const firstPage = 1;
  let pages = 0;
  if (count > 0) {
    pages = Math.floor(count / limit) + (count % limit > 0 ? 1 : 0);
  }

  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <ButtonLeftArrow />
      <Button>{firstPage}</Button>
      <span> ... </span>
      <ButtonDisabled>{currentPage}</ButtonDisabled>
      <span> ... </span>
      <Button>{pages}</Button>
      <ButtonRightArrow />
    </div>
  );
}
