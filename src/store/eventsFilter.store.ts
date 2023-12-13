import { IEvent } from "@/types/IEvent";
import { create } from "zustand";

interface IUseEventsFilterStore {
  searchValue: string;
  locations: string[];
  selectedLocation: string;
  setSearchValue: (value: string) => void;
  setLocations: (events: IEvent[]) => void;
  setSelectedLocation: (selectedLocation: string) => void;
}

export const useEventsFilterStore = create<IUseEventsFilterStore>((set) => ({
  searchValue: "",
  locations: [""],
  selectedLocation: "",

  setSearchValue: (value) => set(() => ({ searchValue: value })),

  setLocations: (events) => {
    const eventLocations = events.map((e) => e.location);

    set((state) => ({ locations: [...state.locations, ...eventLocations] }));
  },

  setSelectedLocation: (selectedLocation) => set(() => ({ selectedLocation })),
}));
