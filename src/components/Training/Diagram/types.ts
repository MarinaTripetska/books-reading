import { Book } from '../../../services/books/books-service';
import { ReadingTraining } from '../../../services/training/training-service';

export interface Datum {
  x: string | Date;
  y: number | null;
}

export type IData = {
  id: string;
  data: Datum[];
};

export interface Props {
  activeTraining?: ReadingTraining;
  createTraining?: {
    books: Book[];
    startDate: string;
    finishDate: string;
  };
}
