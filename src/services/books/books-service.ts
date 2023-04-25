import axiosInstance from '../axiosConfig';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import i18n from '../../locales/i18n';
import BookStatusI from '../../utils/bookStatus';

export type BookT = {
  name: string;
  author: string;
  year?: string;
  pages: string;
};

type UpdateStatusT = {
  bookId: string;
  status: string;
};

type UpdateResumeT = {
  bookId: string;
  resume?: string;
  rating?: number;
};

export type UpdateBookT = {
  bookId: string;
  name?: string;
  author?: string;
  year?: string;
  pages?: string;
  status?: string;
};

export interface Book {
  _id: string;
  name: string;
  author: string;
  year: number;
  pages: number;
  status: BookStatusI;
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  resume: string;
  rating: number | null;
  __v: number;
}

const getAllBooks = async (): Promise<Book[]> => {
  try {
    const data = await axiosInstance.get('/books');
    const result: Book[] = data.data.data.books;
    return result;
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
    return [];
  }
};

const getBookById = async (bookId: string) => {
  try {
    const response = await axiosInstance.get(`/books/book/?bookId=${bookId}`);
    const result: Book = response.data.data;
    return result;
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
  }
};

const getBooksByStatus = async (status: string) => {
  try {
    const { data } = await axiosInstance.get(`/books/status/?status=${status}`);
    return data;
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
    return [];
  }
};

const createBook = async (body: BookT) => {
  try {
    const { data } = await axiosInstance.post('/books/create', body);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        toast.error(i18n?.t?.('toast.existedBook'));
      } else {
        toast.error(i18n?.t?.('toast.errorLog2'));
      }
    }
  }
};

const deleteBook = async (bookId: string) => {
  const result = await axiosInstance.delete(`/books/delete/?bookId=${bookId}`);
  return result;
};

const updateBookStatus = async (body: UpdateStatusT) => {
  try {
    const result = await axiosInstance.patch('/books/update-status', body);
    return result;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(i18n?.t?.('toast.errorLog2'));
    }
  }
};

const updateBookResume = async (body: UpdateResumeT) => {
  try {
    const { data } = await axiosInstance.patch('/books/update-resume', body);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(i18n?.t?.('toast.errorLog2'));
    }
  }
};

const updateBookInfo = async (body: UpdateBookT) => {
  try {
    const { data } = await axiosInstance.put('/books/update', body);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(i18n?.t?.('toast.errorLog2'));
    }
  }
};

const booksApi = {
  getAllBooks,
  updateBookResume,
  updateBookStatus,
  deleteBook,
  createBook,
  getBooksByStatus,
  getBookById,
  updateBookInfo,
};

export default booksApi;
