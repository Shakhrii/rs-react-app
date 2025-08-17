'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CardDetailView } from '../card-detail/CardDetailView';

export function PokemonModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams || '');
    params.delete('id');
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    setOpen(!!id);
  }, [id]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {id && <CardDetailView id={id} />}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
