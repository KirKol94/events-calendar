import { IEvent } from "@/types/IEvent";
import { dateConverter } from "@/utils/dateConverter";
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

    const formedEvents = data.map((e) => ({
      ...e,
      date_start: dateConverter(e.date_start),
      date_end: e.date_end && dateConverter(e.date_end),
    }));

    set((state) => ({ ...state, isLoading: false }));
    return set((state) => ({ events: [...state.events, ...formedEvents] }));
  },
}));
