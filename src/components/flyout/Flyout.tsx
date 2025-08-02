import { ButtonDownload } from './ButtonDownload';
import { ButtonUnselect } from './ButtonUnselect';

export const Flyout = () => {
  return (
    <div
      className="fixed right-20 bottom-10 bg-amber-300 shadow 
    p-10 rounded-sm self-end flex flex-col gap-5"
    >
      <span className="self-start">Selected items: </span>
      <div className="flex gap-3">
        <ButtonDownload />
        <ButtonUnselect />
      </div>
    </div>
  );
};
