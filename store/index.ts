import { create } from 'zustand';
import { createTrackerSlice, TrackerSlice } from './tracker/tracker.slice';
import { persist } from 'zustand/middleware';

export type StoreState = TrackerSlice;

export const useRichStore = create<StoreState>()(
  persist(
    (...args) => ({
      ...createTrackerSlice(...args),
    }),
    {
      name: 'rich-store',
      partialize: (state) => ({
        countries: state.countries,
      }),
    }
  )
);
