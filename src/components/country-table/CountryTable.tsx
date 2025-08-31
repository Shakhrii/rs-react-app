import type { CountryData } from '../../types/types';
import styles from './CountryTable.module.css';

interface CountryTableProps {
  data: CountryData[];
}

function CountryTable({ data }: CountryTableProps) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.sticky_header}>
          <tr>
            <th>Name</th>
            <th>Population</th>
            <th>ISO code</th>
            <th>Year</th>
            <th>CO2</th>
            <th>CO2 per capita</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.data[item.data.length - 1].population ?? 'n/a'}</td>
              <td>{item.iso_code ?? 'n/a'}</td>
              <td>{item.data[item.data.length - 1].year ?? 'n/a'}</td>
              <td>{item.data[item.data.length - 1].cement_co2 ?? 'n/a'}</td>
              <td>
                {item.data[item.data.length - 1].cement_co2_per_capita ?? 'n/a'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CountryTable;
