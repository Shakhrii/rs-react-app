import type { HeaderViewProps } from '../../types/types';
import { MENU_ITEMS } from '../../utils/contstants';
import { Menu } from '../menu/Menu';

export default function HeaderView({ children }: HeaderViewProps) {
  return (
    <header className="pb-6">
      <h1 className="text-neutral-500 text-4xl pb-6">Pokemons Api</h1>
      <nav>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <Menu items={MENU_ITEMS} />
        </div>
      </nav>
      {children}
    </header>
  );
}
