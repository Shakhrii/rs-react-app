import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../../../error/ErrorMessage';
import styles from '../../../Avatar.module.css';
import { FormSchema } from '../../../../../types/types';
import { useState } from 'react';
import { z } from 'zod';

function AvatarInput() {
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    trigger,
    setError,
  } = useFormContext();

  const [photo, setPhoto] = useState('user.png');

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      FormSchema.shape.avatar.parse(file);
      setValue('avatar', file);
      clearErrors('avatar');

      const objectUrl = URL.createObjectURL(file);
      setPhoto(objectUrl);
      console.log(`photo = ${objectUrl}`);
      trigger();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPhoto('user.png');
        setError('avatar', { message: error.issues[0].message });
      }
      event.target.value = '';
    }
  };

  return (
    <div className={styles.file}>
      <img src={photo} alt="avatar" />
      <label htmlFor="avatar">Upload photo</label>
      <input
        {...register('avatar')}
        type="file"
        id="avatar"
        onChange={handleFileChange}
      />
      {errors.avatar && (
        <ErrorMessage message={errors.avatar.message as string} />
      )}
    </div>
  );
}

export default AvatarInput;
