import { useEventsStore } from "@/store/events.store";
import { Container } from "../container";
import { useEventsFilterStore } from "@/store/eventsFilter.store";
import { useEffect } from "react";

export const EventsFilter = () => {
  const events = useEventsStore((state) => state.events);
  const searchValue = useEventsFilterStore((state) => state.searchValue);
  const setSearchValue = useEventsFilterStore((state) => state.setSearchValue);
  const locations = useEventsFilterStore((state) => state.locations);
  const setLocations = useEventsFilterStore((state) => state.setLocations);
  const setSelectedLocation = useEventsFilterStore(
    (state) => state.setSelectedLocation
  );

  useEffect(() => {
    setLocations(events);
  }, [setLocations, events]);

  return (
    <Container className="py-4 flex items-center justify-between">
      <input
        className="px-4 py-2"
        placeholder="Search by title"
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div>
        <label htmlFor="dropdown">Filter by location:</label>
        <select
          className="p-2"
          id="dropdown"
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <span>
        Total events: <b>{events.length}</b>
      </span>
    </Container>
  );
};
