export interface IEvent {
  title: string;
  date_start: string | number;
  date_end: string | number | null;
  location: string;
  description: string;
  url: string;
  ticket_price: string;
}
