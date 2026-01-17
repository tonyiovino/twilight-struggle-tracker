import { Countries, Power, RegionId, Regions, Country } from '~/store/types';

export function computeCountryControl(country: Country): Power | undefined {
  if (country.blueInfluence >= country.redInfluence + country.stability) {
    return Power.USA;
  }

  if (country.redInfluence >= country.blueInfluence + country.stability) {
    return Power.URSS;
  }

  return undefined;
}
