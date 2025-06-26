import lifespan from "./lifespan.json";

export const getLifeExpectancy = (country: string, gender: string) => {
  const countryData = lifespan.countries.find((c) => c.country_name === country);
  const lifeExpectancy = countryData?.life_expectancy[gender];
  return lifeExpectancy;
};

export const getCountries = () => {
  return lifespan.countries.map((c) => c.country_name);
};