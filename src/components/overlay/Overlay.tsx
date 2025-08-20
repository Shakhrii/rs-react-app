import styles from './Overlay.module.css';

interface OverlayProps {
  closeHandler: () => void;
}

function Overlay({ closeHandler }: OverlayProps) {
  return <div onClick={() => closeHandler()} className={styles.overlay}></div>;
}

export default Overlay;
