import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { regions } from '~/store/regions_data';
import { countries } from '~/store/countries_data';
import { Countries, Regions, TTrackeStore } from './types';

export interface TTrackeState {
  regions: Regions;

  countries: Countries;
}

export interface TTrackeMutations {
  setCountries: (countries: Countries) => void;

  setCountryInfluence: (countryName: string, blueInfluence: number, redInfluence: number) => void;
}

export interface TTrackeAction {
  setInfluence: (countryName: string, side: 'blue' | 'red', value: number) => void;
}

const trackerState = {
  regions: regions,

  countries: countries as Countries,
} satisfies TTrackeState;

const trackerMutations = {
  setCountries: (countries) => useTrackerStore.setState({ countries }),

  setCountryInfluence: (countryName, blueInfluence, redInfluence) =>
    useTrackerStore.setState((state) => ({
      countries: state.countries.map((c) =>
        c.name === countryName ? { ...c, blueInfluence, redInfluence } : c
      ),
    })),
} satisfies TTrackeMutations;

const trackerAction = {
  setInfluence: (countryName, side, value) => {
    const { countries, setCountryInfluence } = useTrackerStore.getState();

    const country = countries.find((c) => c.name === countryName);
    if (!country) return;

    setCountryInfluence(
      countryName,
      side === 'blue' ? value : country.blueInfluence,
      side === 'red' ? value : country.redInfluence
    );
  },
} satisfies TTrackeAction;

export const useTrackerStore = create<TTrackeStore>()(
  persist(
    () =>
      <TTrackeStore>{
        ...trackerState,
        ...trackerMutations,
        ...trackerAction,
      },
    {
      name: 'trackerStore',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        countries: state.countries,
      }),
    }
  )
);
