import dayjs from 'dayjs';

export type Book = {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  rating: number;
  readDate: dayjs.Dayjs;
  isFavorite: boolean;
  isRead: boolean;
};
