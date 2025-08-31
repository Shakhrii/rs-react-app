import type { CountryData, Data } from '../types/types';

interface CountryJsonData {
  iso_code: string;
  data: Data[];
}

interface Json {
  [key: string]: CountryJsonData;
}

export async function getCountryData() {
  const response = await fetch('owid-co2-data.json');
  const json = await response.json();
  return parseData(json);
}

function parseData(data: Json) {
  const keys = Object.keys(data);
  const countries = new Array<CountryData>();
  keys.forEach((key) => {
    const country: CountryData = {
      name: key,
      iso_code: data[key].iso_code,
      data: data[key].data,
    };

    countries.push(country);
  });

  return countries;
}
