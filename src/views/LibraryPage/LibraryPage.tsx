import React, { useState, useEffect } from 'react';
import LibraryForm from '../../components/Library/LibraryForm';
import styles from './LibraryPage.module.scss';
import LibraryHint from '../../components/Library/LibraryHint';
import booksApi, { Book } from '../../services/books/books-service';
import LibraryBooksList from '../../components/Library/LibraryBooksList';

enum Status {
  'PENDING' = 'pending',
  'ACTIVE' = 'active',
  'NOTACTIVE' = 'notActive',
}

const LibraryPage = () => {
  const [booksUser, setBooksUser] = useState<Book[]>([]);
  const [status, setStatus] = useState(Status.PENDING);

  const getHasBooks = async () => {
    const data = await booksApi.getAllBooks();
    setBooksUser(data);
    if (data.length) {
      setStatus(Status.ACTIVE);
    } else {
      setStatus(Status.NOTACTIVE);
    }
  };

  useEffect(() => {
    getHasBooks();
  }, []);

  const handleAddBook = (newBook: Book) => {
    if (newBook) {
      setBooksUser([...booksUser, newBook]);
      setStatus(Status.ACTIVE);
    }
  };

  const handleDeleteBook = (deletedBook: Book) => {
    const updatedBooks = booksUser.filter(
      (book) => book._id !== deletedBook._id,
    );
    setBooksUser(updatedBooks);
    if (!updatedBooks.length) {
      setStatus(Status.NOTACTIVE);
    }
  };

  const handleUpdateBook = (updatedBook: Book) => {
    const updatedBooks = booksUser.map((book) =>
      book._id === updatedBook._id ? updatedBook : book,
    );
    setBooksUser(updatedBooks);
  };

  return (
    <div className={styles.wrapper}>
      <LibraryForm onAdd={handleAddBook} />
      {status === Status.ACTIVE && (
        <LibraryBooksList
          books={booksUser}
          handleDelete={handleDeleteBook}
          handleUpdate={handleUpdateBook}
        />
      )}
      {status === Status.NOTACTIVE && <LibraryHint />}
    </div>
  );
};

export default LibraryPage;
