import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import i18n from '../../locales/i18n';
import axiosInstance from '../axiosConfig';
import { Book } from '../books/books-service';
/* import { AxiosError } from 'axios';
import { toast } from 'react-toastify'; */

interface BookId {
  book: string;
}

export interface CreateTrainingInterface {
  start: string;
  finish: string;
  books: BookId[];
}

export type Statistics = {
  date: string;
  pages: number;
  trainingId: string;
};

export interface ReadingTraining {
  _id: string;
  start: string;
  finish: string;
  totalPages: number;
  readPages: number;
  books: [{ book: Book; _id: string }];
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  statistics: Statistics[] | [];
  createdAt: string;
  updatedAt: string;
}

const getActiveTraining = async () => {
  try {
    const response = await axiosInstance.get('/trainings/active-trainings');
    const result = <ReadingTraining[] | []>response.data.data.trainings;
    return result;
  } catch (error) {
    console.log(`Error fetching active training: ${error}`);
  }
};

const createTraining = async (body: CreateTrainingInterface) => {
  try {
    const { data } = await axiosInstance.post('/trainings', body);
    return data;
  } catch (error) {
    console.log(`Error creating training: ${error}`);
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        toast.error(i18n?.t?.('toast.errorOnCreateTraining400'));
      } else {
        toast.error(i18n?.t?.('toast.errorLog2'));
      }
    }
  }
};

const deleteTraining = async (trainingId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `trainings/?trainingId=${trainingId}`,
    );
    return data;
  } catch (error) {
    console.log(`Error deleting training: ${error}`);
  }
};

const addResults = async (body: Statistics) => {
  try {
    const { data } = await axiosInstance.patch('trainings/statistic', body);
    return data.data;
  } catch (error) {
    console.log(`Error deleting training: ${error}`);
  }
};

const trainingApi = {
  getActiveTraining,
  createTraining,
  deleteTraining,
  addResults,
};

export default trainingApi;
