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
      <label htmlFor="name">Name</label>
      <input
        {...register('name')}
        type="text"
        id="name"
        placeholder="Your name"
      />
      {errors.name && <ErrorMessage message={errors.name.message as string} />}
    </div>
  );
}

export default NameInput;
