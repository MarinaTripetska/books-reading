import { Book } from '../../services/books/books-service';

export type DoneT = Pick<Book, '_id' | 'rating' | 'resume'>;

export interface BooksI {
  books: Array<Book> | undefined;
}

export interface BookProps {
  book: Book;
  index: number;
  update: (updatedBook: Book) => void;
  onDelete: (deletedBook: Book) => void;
}
