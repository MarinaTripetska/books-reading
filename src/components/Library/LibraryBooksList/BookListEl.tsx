import React, { FC } from 'react';
import LibraryBook from '../LibraryBook';
import { Book } from '../../../services/books/books-service';

type Props = {
  books: Book[];
  handleUpdate: (updatedBook: Book) => void;
  onDelete: (deletedBook: Book) => void;
};

const BookListEl: FC<Props> = ({ books, handleUpdate, onDelete }) => {
  return (
    <ul>
      {books?.map((book: Book, i: number) => (
        <LibraryBook
          book={book}
          key={book._id}
          index={i}
          update={handleUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default BookListEl;
