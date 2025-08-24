import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../../../error/ErrorMessage';
import styles from '../../../Input.module.css';

function EmailInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={styles.item}>
      <label htmlFor="email">Email</label>
      <input
        {...register('email')}
        type="text"
        id="email"
        placeholder="your@email.com"
      />
      {errors.email && (
        <ErrorMessage message={errors.email.message as string} />
      )}
    </div>
  );
}

export default EmailInput;
