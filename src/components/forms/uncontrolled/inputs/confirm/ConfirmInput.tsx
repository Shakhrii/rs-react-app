import styles from '../../../Input.module.css';

function ConfirmInput() {
  return (
    <div className={styles.item}>
      <label htmlFor="confirm">Confirm password</label>
      <input
        type="text"
        name="confirm"
        id="confirm"
        placeholder="Your password"
      />
    </div>
  );
}

export default ConfirmInput;
