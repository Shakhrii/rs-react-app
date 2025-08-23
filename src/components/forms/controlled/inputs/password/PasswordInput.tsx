import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../../../error/ErrorMessage';
import styles from '../../../Input.module.css';

function PasswordInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={styles.item}>
      {errors.password && (
        <ErrorMessage message={errors.password.message as string} />
      )}
      <label htmlFor="password">Password</label>
      <input
        {...register('password')}
        type="password"
        id="password"
        placeholder="Your password"
      />
    </div>
  );
}

export default PasswordInput;
