import { selectFormDataItems } from '../../store/slices/formDataItems.slice';
import { useAppSelector } from '../../store/store';
import DataItem from './data-item/DataItem';

function DataList() {
  const dataFormItems = useAppSelector(selectFormDataItems);
  return dataFormItems.length > 0 ? (
    dataFormItems.map((item) => <DataItem key={item.name} dataItem={item} />)
  ) : (
    <div>Нет данных для отображения, сделай submit формы</div>
  );
}

export default DataList;
