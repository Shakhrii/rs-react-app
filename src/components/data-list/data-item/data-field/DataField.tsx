import styles from './DataField.module.css';

type DataFieldProps = {
  name: string;
  value: string | boolean;
};

function DataField({ name, value }: DataFieldProps) {
  return (
    <div className={styles.field}>
      <span className={styles.name}>{name}:</span>
      <span className={styles.value}>
        {name === 'agreement' ? 'yes' : value}
      </span>
    </div>
  );
}

export default DataField;
