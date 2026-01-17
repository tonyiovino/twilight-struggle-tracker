import { StateCreator } from 'zustand';
import { Country, Power, Regions } from './tracker.types';
import { countries as countriesArray } from '../countries_data';
import { regions as initialRegions } from '../regions_data';

// Utils
function normalizeCountries(countries: Country[]): Record<string, Country> {
  return countries.reduce<Record<string, Country>>((acc, c) => {
    acc[c.name] = c;
    return acc;
  }, {});
}

const INITIAL_COUNTRIES = normalizeCountries(countriesArray as Country[]);

export type TrackerSlice = {
  countries: Record<string, Country>;
  regions: Regions;

  setInfluence: (countryName: string, power: Power, value: number) => void;
  resetInfluences: () => void;
};

export const createTrackerSlice: StateCreator<TrackerSlice, [], [], TrackerSlice> = (set, get) => {
  const mutations = {
    setCountry: (countryName: string, country: Country) =>
      set((state) => ({
        countries: {
          ...state.countries,
          [countryName]: country,
        },
      })),

    resetCountries: () =>
      set({
        countries: INITIAL_COUNTRIES,
      }),
  };

  return {
    countries: INITIAL_COUNTRIES,
    regions: initialRegions,

    setInfluence: (countryName: string, power: Power, value: number) => {
      const country = get().countries[countryName];
      if (!country) return;

      mutations.setCountry(countryName, {
        ...country,
        blueInfluence: power === Power.USA ? value : country.blueInfluence,
        redInfluence: power === Power.URSS ? value : country.redInfluence,
      });
    },
    resetInfluences: () => {
      mutations.resetCountries();
    },
  };
};
