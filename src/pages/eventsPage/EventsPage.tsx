import { Container } from "@/components/container";
import { EventsFilter } from "@/components/eventsFilter";
import { Loader } from "@/components/loader";
import { Modal } from "@/components/modal";
import { useEventsStore } from "@/store/events.store";
import { useEventsFilterStore } from "@/store/eventsFilter.store";
import { IEvent } from "@/types/IEvent";
import clsx from "clsx";
import { useEffect, useState } from "react";

const EventsPage = () => {
  const searchValue = useEventsFilterStore((state) => state.searchValue);
  const selectedLocation = useEventsFilterStore(
    (state) => state.selectedLocation
  );
  const events = useEventsStore((state) =>
    state.events
      .filter((e) =>
        e.title.toLocaleLowerCase().includes(searchValue.toLowerCase())
      )
      .filter((e) => {
        if (selectedLocation === "all") return e;
        else return e.location.includes(selectedLocation);
      })
      .sort((a, b) => +a.date_start - +b.date_start)
  );
  const isLoading = useEventsStore((state) => state.isLoading);
  const fetchEvents = useEventsStore((state) => state.fetchEvents);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEvent | null>(null);
  const showDetails = (event: IEvent) => {
    setIsOpen(true);
    setCurrentEvent(event);
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (isLoading) {
    return <Loader />;
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
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 even:bg-gray-200"
                  onClick={() => showDetails(event)}
                >
                  <td className="px-4 py-2">
                    <span
                      className={clsx(
                        "p-2 rounded text-white whitespace-nowrap",
                        new Date(event.date_start) < new Date() &&
                          new Date(event.date_start).getMonth() !==
                            new Date().getMonth() &&
                          "bg-gray-300 line-through",
                        new Date(event.date_start) > new Date() &&
                          new Date(event.date_start).getMonth() !==
                            new Date().getMonth() &&
                          "bg-green-600",
                        new Date(event.date_start).getMonth() ===
                          new Date().getMonth() && "bg-blue-600"
                      )}
                    >
                      {`${new Date(event.date_start).getDate()}
                      -
                      ${event.date_end && new Date(event.date_end).getDate()}`}
                    </span>
                    <span className="p-2">
                      {monthNames[new Date(event.date_start).getMonth()]}
                      {new Date(event.date_start).getFullYear()}
                    </span>
                  </td>
                  <td className="min-w-3/4 px-4 py-2">{event.title}</td>
                  <td className="px-4 py-2">{event.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      <Modal
        title={currentEvent?.title || "Event name"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {currentEvent && (
          <div>
            <p className="text-gray-600 mb-2">
              <b>Date:</b>
              {`${new Date(currentEvent.date_start).getDate()} ${
                monthNames[new Date(currentEvent.date_start).getMonth()]
              } - ${
                currentEvent.date_end &&
                `${new Date(currentEvent.date_end).getDate()} ${
                  monthNames[new Date(currentEvent.date_end).getMonth()]
                } ${new Date(currentEvent.date_end).getFullYear()}`
              }`}
            </p>
            <p className="text-gray-600 mb-2">
              <b>Location:</b> {currentEvent.location}
            </p>
            <p className="text-gray-600 mb-2">
              <b>Description:</b> {currentEvent.description}
            </p>
            <p className="text-gray-600 mb-2">
              <b>URL:</b>{" "}
              <a
                target="_blank"
                href={"http://" + currentEvent.url}
                className="text-blue-500 hover:underline"
              >
                {currentEvent.url}
              </a>
            </p>
            <p className="text-gray-600 mb-2">
              <b>Ticket Price:</b> {currentEvent.ticket_price}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default EventsPage;
