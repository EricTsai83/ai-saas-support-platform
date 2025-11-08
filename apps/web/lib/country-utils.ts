import * as ct from "countries-and-timezones";

export const getCountryFromTimezone = (timezone: string) => {
  const timezoneInfo = ct.getTimezone(timezone);
  if (!timezoneInfo?.countries?.length) return null;

  const countryCode = timezoneInfo.countries[0];
  const country = ct.getCountry(countryCode as string);

  return {
    code: countryCode,
    name: country?.name || countryCode,
  };
};

export const getCountryFlagUrl = (countryCode: string) => {
  // !Important: this is a temporary solution to get the country flag url. We should use a more permanent solution in the future
  if (!countryCode) return undefined;
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
};
