import { countries } from './countries';

export const getCounrtiesByQuery = (query: string) => {
  const filteredCountries = [];
  for (const country of countries) {
    if (country.name.toLowerCase().startsWith(query.toLowerCase())) {
      filteredCountries.push(country.name);
    }
  }

  return filteredCountries;
};
