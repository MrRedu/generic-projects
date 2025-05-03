import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Event } from '../types/events.types';

type State = {
  events: Event[];
};

type Actions = {
  addEvent: (event: Event) => void;
  editEvent: (event: Event) => void;
  removeEvent: (id: string) => void;
  resetEvents: () => void;
};

type eventsStore = State & Actions;
export const useEventsStore = create<eventsStore>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) =>
        set((state) => ({ events: [...state.events, event] })),
      editEvent: (event) =>
        set((state) => ({
          events: state.events.map((e) => (e.id === event.id ? event : e)),
        })),
      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),
      resetEvents: () => set({ events: [] }),
    }),
    {
      name: 'events-storage',
    }
  )
);
