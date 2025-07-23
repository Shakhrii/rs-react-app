import type { MainViewProps } from '../../types/types';

export default function MainView({ children }: MainViewProps) {
  return (
    <main className="w-full flex items-center justify-center">{children}</main>
  );
}
