import styles from '../../../Input.module.css';

function NameInput() {
  return (
    <div className={styles.item}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" placeholder="Your name" />
    </div>
  );
}

export default NameInput;
