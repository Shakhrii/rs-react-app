import styles from './CompletedList.module.css';

interface CompletedListProps {
  countries: Array<string>;
  handleClick: (country: string) => void;
}

function CompletedList({ countries, handleClick }: CompletedListProps) {
  return (
    <ul className={styles.list}>
      {countries.map((country) => (
        <li
          className={styles.item}
          key={country}
          onClick={() => handleClick(country)}
        >
          {country}
        </li>
      ))}
    </ul>
  );
}

export default CompletedList;
