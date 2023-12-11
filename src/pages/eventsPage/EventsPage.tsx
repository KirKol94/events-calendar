import { Container } from "@/components/container";
import { EventsFilter } from "@/components/eventsFilter";
import { useEventsStore } from "@/store/events.store";
import { useEventsFilterStore } from "@/store/eventsFilter.store";
import { dateConverter } from "@/utils/dateConverter";
import { useEffect } from "react";

export const EventsPage = () => {
  const searchValue = useEventsFilterStore((state) => state.searchValue);
  const events = useEventsStore((state) =>
    state.events.filter((e) =>
      e.title.toLocaleLowerCase().includes(searchValue.toLowerCase())
    )
  );
  const isLoading = useEventsStore((state) => state.isLoading);
  const fetchEvents = useEventsStore((state) => state.fetchEvents);

  useEffect(() => {
    fetchEvents();
  }, []);

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
                <th className="border border-gray-400 px-4 py-2">Title</th>
                <th className="border border-gray-400 px-4 py-2">Start Date</th>
                <th className="border border-gray-400 px-4 py-2">End Date</th>
                <th className="border border-gray-400 px-4 py-2">Location</th>
                <th className="border border-gray-400 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-400 px-4 py-2">URL</th>
                <th className="border border-gray-400 px-4 py-2">
                  Ticket Price
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">
                    {event.title}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {event.date_start}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {event.date_end}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {event.location}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {event.description}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <a
                      href={event.url}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {event.url}
                    </a>
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {event.ticket_price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};
