export enum statusBook {
  'ACTIVE' = 'active',
  'PENDING' = 'pending',
  'DONE' = 'done',
}

type BookStatusI = statusBook.ACTIVE | statusBook.PENDING | statusBook.DONE;

export default BookStatusI;
