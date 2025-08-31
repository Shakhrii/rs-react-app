import { useEffect, useState } from 'react';
import CountryTable from '../../components/country-table/CountryTable';
import { getCountryData } from '../../api/Api';
import type { CountryData } from '../../types/types';

function MainPage() {
  const [countryList, setCountryList] = useState<CountryData[]>([]);

  useEffect(() => {
    getCountryData().then((list) => setCountryList(list));
  }, []);

  return <CountryTable data={countryList} />;
}

export default MainPage;
