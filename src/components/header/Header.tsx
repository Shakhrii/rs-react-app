import styles from './Header.module.css';

interface HeaderProps {
  controlledClickHandler: () => void;
  uncontrolledClickHandler: () => void;
}

function Header({
  controlledClickHandler,
  uncontrolledClickHandler,
}: HeaderProps) {
  return (
    <div className={styles.wrapper}>
      <button onClick={() => controlledClickHandler()}>Uncontrolled</button>
      <button onClick={() => uncontrolledClickHandler()}>Controlled</button>
    </div>
  );
}

export default Header;
