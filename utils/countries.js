// utils/countries.js
import countries from 'world-countries';

export const formattedCountries = countries.map((item) => ({
  code: item.cca2,
  name: item.name.common,
  flag: item.flag,
  location: item.latlng,
  region: item.region,
  label: item.name.common,
}));

export const findCountryByCode = (input) => {
  if (!input) return null;

  const codeMatch = formattedCountries.find(
    (item) => item.code.toLowerCase() === input.toLowerCase()
  );

  if (codeMatch) return codeMatch;

  const nameMatch = formattedCountries.find(
    (item) => item.name.toLowerCase() === input.toLowerCase()
  );

  return nameMatch || null;
};
