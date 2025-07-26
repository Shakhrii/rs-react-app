import { useParams } from 'react-router';
import { CardDetailView } from '../../components/card-detail/CardDetailView';

export function Pokemon() {
  const { detailsId } = useParams();

  return (
    <>
      <CardDetailView id={detailsId || ''} />
    </>
  );
}
