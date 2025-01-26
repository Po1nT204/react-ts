import dayjs from 'dayjs';

export type Quote = {
  id: string;
  author: string;
  book: string;
  quote: string;
  createDate: dayjs.Dayjs;
};
