export function filterByRegion(countryList, region) {
  return countryList.filter((country) => country.region === region);
}
