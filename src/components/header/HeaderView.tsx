import { Link } from 'react-router';
import type { HeaderViewProps } from '../../types/types';
import { useState } from 'react';

export default function HeaderView({ children }: HeaderViewProps) {
  const [isActivePokemons, setActivePokemons] = useState(true);

  return (
    <header className="pb-6">
      <h1 className="text-neutral-500 text-4xl pb-6">Pokemons Api</h1>
      <nav>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px items-center justify-center">
            <li className="me-2">
              <Link
                to="/"
                onClick={() => setActivePokemons(true)}
                className={`inline-block p-4 border-b-2  rounded-t-lg ${isActivePokemons ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                aria-current="page"
              >
                Pokemons
              </Link>
            </li>
            <li className="me-2">
              <Link
                to="/about"
                onClick={() => setActivePokemons(false)}
                className={`inline-block p-4 border-b-2  rounded-t-lg ${!isActivePokemons ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </header>
  );
}
