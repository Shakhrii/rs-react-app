import { ButtonDownload } from './ButtonDownload';
import { ButtonUnselect } from './ButtonUnselect';
import { useAppSelector } from '../../store/store';
import { selectSelectedItems } from '../../store/slices/selectedItems.slice';

export const Flyout = () => {
  const selectedItems = useAppSelector(selectSelectedItems);
  const length = selectedItems.length;

  return length > 0 ? (
    <div
      className="fixed right-20 bottom-10 bg-amber-300 shadow 
      p-10 rounded-sm self-end flex flex-col gap-5"
    >
      <span className="self-start">Selected items: {length}</span>
      <div className="flex gap-3">
        <ButtonDownload />
        <ButtonUnselect />
      </div>
    </div>
  ) : null;
};
