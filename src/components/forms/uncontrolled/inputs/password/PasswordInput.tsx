import styles from '../Inputs.module.css';

function PasswordInput() {
  return (
    <div className={styles.item}>
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        id="password"
        placeholder="Your password"
      />
    </div>
  );
}

export default PasswordInput;
