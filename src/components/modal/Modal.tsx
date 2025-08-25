import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import Overlay from '../overlay/Overlay';
import { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  closeHandler: () => void;
}

const modalElement = document.getElementById('modal');

function Modal({ children, closeHandler }: ModalProps) {
  useEffect(() => {
    function clickEsc(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        closeHandler();
      }
    }

    document.addEventListener('keydown', clickEsc);
    return () => document.removeEventListener('keydown', clickEsc);
  });

  if (!modalElement) {
    return null;
  }

  return createPortal(
    <>
      <div className={styles.modal}>
        <button className={styles.close} onClick={() => closeHandler()}>
          x
        </button>
        {children}
      </div>
      <Overlay closeHandler={closeHandler} />
    </>,
    modalElement
  );
}

export default Modal;
