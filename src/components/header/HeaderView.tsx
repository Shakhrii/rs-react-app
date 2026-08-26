import { useTheme } from '../../hooks/useTheme';
import type { HeaderViewProps } from '../../types/types';
import { MENU_ITEMS } from '../../utils/contstants';
import { Menu } from '../menu/Menu';
import { ThemeToggle } from './ThemeToggle';

export default function HeaderView({ children }: HeaderViewProps) {
  const { theme } = useTheme();
  return (
    <header className="pb-6">
      <div>
        <h1
          className={`text-4xl font-bebas pb-6 ${theme === 'dark' ? 'text-white' : 'text-neutral-500'}`}
        >
          Pokemons Api
        </h1>
        <ThemeToggle />
      </div>
      <nav>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <Menu items={MENU_ITEMS} />
        </div>
      </nav>
      {children}
    </header>
  );
}
