import { IEvent } from "@/types/IEvent";
import { BASE_API_UR } from "@/vars/baseApiUrl";
import ky from "ky";
import { create } from "zustand";

interface IUseEventsStore {
  events: IEvent[];
  isLoading: boolean;
  fetchEvents: () => void;
}

export const useEventsStore = create<IUseEventsStore>((set) => ({
  events: [],
  isLoading: false,

  fetchEvents: async () => {
    set((state) => ({ ...state, isLoading: true }));
    const { data }: { data: IEvent[] } = await ky(BASE_API_UR).json();

    set((state) => ({ ...state, isLoading: false }));
    return set((state) => ({ events: [...state.events, ...data] }));
  },
}));
