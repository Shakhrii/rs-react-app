'use client';

import { ButtonDownload } from './ButtonDownload';
import { ButtonUnselect } from './ButtonUnselect';
import { useTheme } from '../../hooks/useTheme';
import { useAppSelector } from '../../../lib/hooks';
import { selectSelectedItems } from '../../../lib/features/selectedItems/selectedItems.slice';

export const Flyout = () => {
  const { theme } = useTheme();
  const selectedItems = useAppSelector(selectSelectedItems);
  const length = selectedItems.length;

  return length > 0 ? (
    <div
      className={`fixed right-20 bottom-10 shadow 
      p-10 rounded-sm self-end flex flex-col gap-5  
      ${
        theme === 'dark'
          ? 'bg-[var(--accent-color-dark)]'
          : 'bg-[var(--accent-color-light)]'
      }`}
    >
      <span className="self-start">Selected items: {length}</span>
      <div className="flex gap-3">
        <ButtonDownload />
        <ButtonUnselect />
      </div>
    </div>
  ) : null;
};
