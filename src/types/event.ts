export type Event = {
  id: number;
  title: string;
  date: string;     // dari database berupa DATETIME → gunakan string
  location: string;
  cover: string;
  category: string;
  description: string;
  attendees: number;
};
