import { Sort } from './types/Sort';

export const sortBookOptionList: Sort[] = [
  { sortType: 'title', text: 'названию' },
  { sortType: 'author', text: 'автору' },
  { sortType: 'readDate', text: 'дате добавления' },
  { sortType: 'rating', text: 'оценке' },
];

export const sortQuotesOptionList: Sort[] = [
  { sortType: 'createDate', text: 'дате содания' },
  { sortType: 'book', text: 'книге' },
];

export const sortAuthorsOptionList: Sort[] = [
  { sortType: 'name', text: 'имени' },
  { sortType: 'likedBooks', text: 'количеству любимых книг' },
];
