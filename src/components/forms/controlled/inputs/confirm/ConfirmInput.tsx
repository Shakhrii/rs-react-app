import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../../../error/ErrorMessage';
import styles from '../../../Input.module.css';

function ConfirmInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.item}>
      <label htmlFor="confirm">Confirm password</label>
      <input
        {...register('confirm')}
        type="password"
        id="confirm"
        placeholder="Your password"
      />
      {errors.confirm && (
        <ErrorMessage message={errors.confirm.message as string} />
      )}
    </div>
  );
}

export default ConfirmInput;
