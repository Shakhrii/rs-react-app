import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from '../Form.module.css';
import controlledStyles from './ControlledForm.module.css';
import { countries } from '../../../data/countries';

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirm: string;
  country: string;
  gender: 'male' | 'female';
  agreement: boolean;
  avatar: string;
}

function ControlledForm() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const submitHandler: SubmitHandler<IFormInput> = (data) => console.log(data);
  const handleUploadPhoto = () => {};

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
      <h1>Controlled Form</h1>
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.item}>
            <label htmlFor="name">Name</label>
            <input
              {...register('name')}
              type="text"
              id="name"
              placeholder="Your name"
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="email">Email</label>
            <input
              {...register('email')}
              type="text"
              id="email"
              placeholder="your@email.com"
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="password">Password</label>
            <input
              {...register('password')}
              type="text"
              id="password"
              placeholder="Your password"
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="confirm">Password</label>
            <input
              {...register('confirm')}
              type="text"
              id="password"
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
            <label htmlFor="country">Country</label>
            <input
              {...register('country')}
              type="text"
              id="country"
              placeholder="Russia"
              list="countries"
            />
            <datalist id="countries">
              {countries.map((country) => (
                <option key={country.code} value={country.name} />
              ))}
            </datalist>
          </div>
          <fieldset>
            <legend>Gender</legend>
            <div>
              <input type="radio" id="male" name="gender" value="male" />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input type="radio" id="female" name="gender" value="female" />
              <label htmlFor="female">Female</label>
            </div>
          </fieldset>
          <div className={controlledStyles.file}>
            <img src="user.png" alt="avatar" />
            <label htmlFor="avatar">Upload photo</label>
            <input
              {...register('avatar')}
              type="file"
              id="avatar"
              accept="image/jpeg, image/png"
              onChange={() => handleUploadPhoto()}
            />
          </div>
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default ControlledForm;
