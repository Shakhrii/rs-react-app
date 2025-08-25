import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../../../error/ErrorMessage';
import styles from '../../../Input.module.css';
import { countries } from '../../../../../data/countries';

function CountryInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={styles.item}>
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
      {errors.country && (
        <ErrorMessage message={errors.country.message as string} />
      )}
    </div>
  );
}

export default CountryInput;
