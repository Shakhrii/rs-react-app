import type { FormDataItem } from '../../../types/types';
import { convertBase64toFile } from '../../../utils/base64';
import DataField from './data-field/DataField';
import styles from './DataItem.module.css';

type DataItemProps = {
  dataItem: FormDataItem;
  className: string;
};

function DataItem({ dataItem, className }: DataItemProps) {
  const { avatar, ...data } = dataItem;
  const file = convertBase64toFile(avatar);
  const objectUrl = URL.createObjectURL(file);

  return (
    <div className={`${styles.item} ${className}`}>
      <img className={styles.avatar} src={objectUrl} alt="avatar" />
      {Object.entries(data).map(([key, value]) => (
        <DataField key={key} name={key} value={value} />
      ))}
    </div>
  );
}

export default DataItem;
