import { useParams } from 'react-router';

export function Pokemon() {
  const { detailsId } = useParams();
  return (
    <h1 className="text-4xl">
      Детальная информация о покемоне c id = {detailsId}
    </h1>
  );
}
