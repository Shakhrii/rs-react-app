import styles from '../../../Input.module.css';

function EmailInput() {
  return (
    <div className={styles.item}>
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" placeholder="your@email.com" />
    </div>
  );
}

export default EmailInput;
