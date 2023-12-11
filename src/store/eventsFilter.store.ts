import { create } from "zustand";

interface IUseEventsFilterStore {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const useEventsFilterStore = create<IUseEventsFilterStore>((set) => ({
  searchValue: "",

  setSearchValue: (value) => set(() => ({ searchValue: value })),
}));
