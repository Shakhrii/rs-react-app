export type CountryData = {
  name: string;
  iso_code: string;
  data: Data[];
};

export type Data = {
  year: number;
  population: number;
  cement_co2: number;
  cement_co2_per_capita: number;
};
