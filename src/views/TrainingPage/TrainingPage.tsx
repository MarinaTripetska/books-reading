import React, { useState, useEffect } from 'react';
import trainingApi, {
  ReadingTraining,
} from '../../services/training/training-service';
import Loader from '../../components/Loader';
import TrainingFull from '../../components/Training/TrainingFull';
import TrainingEmpty from '../../components/Training/TrainingEmpty';
import BookStatus from '../../utils/bookStatus';

import { Background, Thumb } from './TrainingPage.styled';

enum Status {
  'PENDING' = 'pending',
  'FULL' = 'full',
  'EMPTY' = 'empty',
}

const TrainingPage = () => {
  const [training, setTraining] = useState<ReadingTraining | null>(null);
  const [status, setStatus] = useState(Status.PENDING);

  const getStatus = async () => {
    const data = await trainingApi.getActiveTraining();
    if (data?.length) {
      setStatus(Status.FULL);
      setTraining(data[0]);
    } else {
      setStatus(Status.EMPTY);
    }
  };

  const updateTrainingPage = (training: ReadingTraining | null) => {
    setTraining(training);
    if (training) {
      setStatus(Status.FULL);
    } else {
      setStatus(Status.EMPTY);
    }
  };

  const setBookStatus = (onjBookId: string, status: BookStatus) => {
    if (training) {
      const updatedBooks = training.books.map((book) => {
        if (book._id === onjBookId) {
          return {
            _id: book._id,
            book: {
              ...book.book,
              status,
            },
          };
        }
        return book;
      });

      const updatedTraining = {
        ...training,
        books: updatedBooks,
      };

      setTraining(updatedTraining as ReadingTraining);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <Background>
      <Thumb>
        {status === Status.PENDING && <Loader />}

        {status === Status.FULL && training && (
          <TrainingFull
            training={training}
            updateTraining={updateTrainingPage}
            setBookStatus={setBookStatus}
          />
        )}

        {status === Status.EMPTY && !training && (
          <TrainingEmpty changeTraining={updateTrainingPage} />
        )}
      </Thumb>
    </Background>
  );
};

export default TrainingPage;
