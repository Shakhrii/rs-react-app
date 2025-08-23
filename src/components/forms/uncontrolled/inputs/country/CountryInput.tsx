import { countries } from '../../../../../data/countries';
import styles from '../../../Input.module.css';

function CountryInput() {
  return (
    <div className={styles.item}>
      <label htmlFor="country">Country</label>
      <input
        type="text"
        name="country"
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
  );
}

export default CountryInput;
