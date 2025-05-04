import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FormatHours, WeekStartsOn } from '../types/events.types';

type State = {
  formatHours: FormatHours;
  weekStartsOn: WeekStartsOn;
  // showWeekNumbers: boolean;
};

type Actions = {
  toggleFormatHours: () => void;
  toggleWeekStartsOn: () => void;
};

type preferencesStore = State & Actions;
export const usePreferencesStore = create<preferencesStore>()(
  persist(
    (set) => ({
      formatHours: '24h',
      weekStartsOn: 'monday',
      // showWeekNumbers: false,
      toggleFormatHours: () =>
        set((state) => ({
          formatHours: state.formatHours === '12h' ? '24h' : '12h',
        })),
      toggleWeekStartsOn: () =>
        set((state) => ({
          weekStartsOn: state.weekStartsOn === 'monday' ? 'sunday' : 'monday',
        })),
    }),
    {
      name: 'preferences-storage',
    }
  )
);
