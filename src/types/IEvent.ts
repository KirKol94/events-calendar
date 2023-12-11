export interface IEvent {
  title: string;
  date_start: string;
  date_end: string | null;
  location: string;
  description: string;
  url: string;
  ticket_price: string;
}
