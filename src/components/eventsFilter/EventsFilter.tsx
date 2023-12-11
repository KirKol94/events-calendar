import { useEventsStore } from "@/store/events.store";
import { Container } from "../container";
import { useEventsFilterStore } from "@/store/eventsFilter.store";

export const EventsFilter = () => {
  const events = useEventsStore((state) => state.events);
  const searchValue = useEventsFilterStore((state) => state.searchValue);
  const setSearchValue = useEventsFilterStore((state) => state.setSearchValue);

  return (
    <Container className="py-4 flex items-center justify-between">
      <input
        className="px-4 py-2"
        placeholder="Search"
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <span>
        Total events: <b>{events.length}</b>
      </span>
    </Container>
  );
};
