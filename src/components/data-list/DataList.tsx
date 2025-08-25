import { selectFormDataItems } from '../../store/slices/formDataItems.slice';
import { useAppSelector } from '../../store/store';
import DataItem from './data-item/DataItem';
import styles from './DataList.module.css';

function DataList() {
  const dataFormItems = useAppSelector(selectFormDataItems);

  return dataFormItems.length > 0 ? (
    <div className={styles.list}>
      {dataFormItems.map((item, index) => (
        <DataItem
          key={item.name}
          dataItem={item}
          className={index === dataFormItems.length - 1 ? styles.last_item : ''}
        />
      ))}
    </div>
  ) : (
    <div className={styles.empty}>
      Нет данных для отображения, сделай submit формы
    </div>
  );
}

export default DataList;
