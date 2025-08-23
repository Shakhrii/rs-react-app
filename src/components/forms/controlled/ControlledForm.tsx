import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from '../Form.module.css';
import controlledStyles from './ControlledForm.module.css';
import { countries } from '../../../data/countries';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '../../../types/types';
import { z } from 'zod';
import ErrorMessage from '../error/ErrorMessage';

type FormType = z.infer<typeof FormSchema>;

function ControlledForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
  });
  const submitHandler: SubmitHandler<FormType> = (data) => console.log(data);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      FormSchema.shape.avatar.parse(file);
      setValue('avatar', file);
      clearErrors('avatar');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError('avatar', { message: error.issues[0].message });
      }
      event.target.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
      <h1>Controlled Form</h1>
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.item}>
            {errors.name && (
              <ErrorMessage message={errors.name.message || ''} />
            )}
            <label htmlFor="name">Name</label>
            <input
              {...register('name')}
              type="text"
              id="name"
              placeholder="Your name"
            />
          </div>
          <div className={styles.item}>
            {errors.email && (
              <ErrorMessage message={errors.email.message || ''} />
            )}
            <label htmlFor="email">Email</label>
            <input
              {...register('email')}
              type="text"
              id="email"
              placeholder="your@email.com"
            />
          </div>
          <div className={styles.item}>
            {errors.password && (
              <ErrorMessage message={errors.password.message || ''} />
            )}
            <label htmlFor="password">Password</label>
            <input
              {...register('password')}
              type="password"
              id="password"
              placeholder="Your password"
            />
          </div>
          <div className={styles.item}>
            {errors.confirm && (
              <ErrorMessage message={errors.confirm.message || ''} />
            )}
            <label htmlFor="confirm">Confirm password</label>
            <input
              {...register('confirm')}
              type="password"
              id="confirm"
              placeholder="Your password"
            />
          </div>
          <div>
            <input {...register('agreement')} type="checkbox" id="agreement" />
            <label htmlFor="agreement">I agree with Terms and Conditions</label>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.item}>
            {errors.country && (
              <ErrorMessage message={errors.country.message || ''} />
            )}
            <label htmlFor="country">Country</label>
            <input
              {...register('country')}
              type="text"
              id="country"
              placeholder="Russian Federation"
              list="countries"
            />
            <datalist id="countries">
              {countries.map((country) => (
                <option key={country.code} value={country.name} />
              ))}
            </datalist>
          </div>
          <fieldset>
            {errors.gender && (
              <ErrorMessage message={errors.gender.message || ''} />
            )}
            <legend>Gender</legend>
            <div>
              <input
                {...register('gender')}
                type="radio"
                id="male"
                value="male"
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                {...register('gender')}
                type="radio"
                id="female"
                value="female"
              />
              <label htmlFor="female">Female</label>
            </div>
          </fieldset>
          <div className={controlledStyles.file}>
            {errors.avatar && (
              <ErrorMessage message={errors.avatar.message || ''} />
            )}
            <img src="user.png" alt="avatar" />
            <label htmlFor="avatar">Upload photo</label>
            <input
              {...register('avatar')}
              type="file"
              id="avatar"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default ControlledForm;
