'use client';

import { useRouter } from 'next/navigation';
import { ErrorView } from '../components/error/ErrorView';
import { PAGE_ROUTES } from '../utils/contstants';

export default function NotFound() {
  const router = useRouter();

  return (
    <ErrorView
      message="Page not found"
      buttonText="Back to Pokemons"
      clickHandler={() => router.replace(PAGE_ROUTES.POKEMONS)}
    />
  );
}
