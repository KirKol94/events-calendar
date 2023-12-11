import { Container } from "@/components/container";
import { EventsFilter } from "@/components/eventsFilter";
import { useEventsStore } from "@/store/events.store";
import { useEventsFilterStore } from "@/store/eventsFilter.store";
import { dateConverter } from "@/utils/dateConverter";
import { useEffect } from "react";

const EventsPage = () => {
  const searchValue = useEventsFilterStore((state) => state.searchValue);
  const events = useEventsStore((state) =>
    state.events
      .filter((e) =>
        e.title.toLocaleLowerCase().includes(searchValue.toLowerCase())
      )
      .sort(
        (a, b) =>
          +new Date(dateConverter(a.date_start)) -
          +new Date(dateConverter(b.date_start))
      )
  );
  const isLoading = useEventsStore((state) => state.isLoading);
  const fetchEvents = useEventsStore((state) => state.fetchEvents);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (isLoading) {
    return " Loading...";
  }

  return (
    <>
      <EventsFilter />

      <Container>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Event Name</th>
                <th className="px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <span className="p-2 bg-red-500 rounded text-white">
                      {`${event.date_start.split("/")[1]}-${
                        event.date_end !== event.date_start &&
                        event.date_end?.split("/")[1]
                      }`}
                    </span>
                    {new Date(dateConverter(event.date_start)).getMonth() + 1}
                    {"-"}
                    {new Date(dateConverter(event.date_start)).getFullYear()}
                  </td>
                  <td className="px-4 py-2">{event.title}</td>
                  <td className="px-4 py-2">{event.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

export default EventsPage;
