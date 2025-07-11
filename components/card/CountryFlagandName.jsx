import { findCountryByCode } from '@/utils/countries';

function CountryFlagAndName({ countryCode }) {
  const validCountry = findCountryByCode(countryCode);

  if (!validCountry) return null;

  const countryName =
    validCountry.name.length > 20
      ? validCountry.name.substring(0, 20) + '...'
      : validCountry.name;

  return (
    <span className="flex justify-between items-center gap-2 text-sm">
      {validCountry.flag} {countryName}
    </span>
  );
}

export default CountryFlagAndName;
