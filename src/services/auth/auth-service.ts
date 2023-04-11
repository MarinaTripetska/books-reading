import axiosInstance from '../axiosConfig';

type Credentials = {
  name: string;
  email: string;
  password: string;
};

type LoginCreds = Omit<Credentials, 'name'>;

export type TokenType = {
  refreshToken: string | null;
};

export const loginUser = async (credentials: LoginCreds) => {
  const { data } = await axiosInstance.post('/users/login', credentials);
  return data;
};

export const registerUser = async (credentials: Credentials) => {
  const { data } = await axiosInstance.post('/users/signup', credentials);
  return data;
};

export const logoutUser = async () => {
  const data = await axiosInstance.get('/users/logout');
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get('users/current');
  return data;
};

export const getNewTokens = async (data: TokenType) => {
  const result = await axiosInstance.post('/users/refresh-tokens', data);
  return result;
};

const apiService = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getNewTokens,
};

export default apiService;
