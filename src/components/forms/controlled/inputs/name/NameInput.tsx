import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../../../error/ErrorMessage';
import styles from '../../../Input.module.css';

function NameInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={styles.item}>
      {errors.name && <ErrorMessage message={errors.name.message as string} />}
      <label htmlFor="name">Name</label>
      <input
        {...register('name')}
        type="text"
        id="name"
        placeholder="Your name"
      />
    </div>
  );
}

export default NameInput;
