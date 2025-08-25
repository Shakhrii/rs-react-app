import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../../../error/ErrorMessage';
import styles from '../../../Input.module.css';

function PasswordInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors.password;
  console.log(error);
  return (
    <div className={styles.item}>
      <label htmlFor="password">Password</label>
      <input
        {...register('password')}
        type="password"
        id="password"
        placeholder="Your password"
      />
      {errors.password && (
        <ErrorMessage message={errors.password.message as string} />
      )}
    </div>
  );
}

export default PasswordInput;
