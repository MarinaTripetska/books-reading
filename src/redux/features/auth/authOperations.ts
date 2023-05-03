import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch } from '../../app/store';
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginError,
  loginRequest,
  loginSuccess,
  logoutError,
  logoutRequest,
  logoutSuccess,
  getCurrentUserError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  setTokensSuccess,
} from './authSlice';
import apiService from '../../../services/auth/auth-service';
import tokenService from '../../../services/auth/token-service';
import i18n from '../../../locales/i18n';

type Credentials = {
  name: string;
  email: string;
  password: string;
};

type LoginCreds = Omit<Credentials, 'name'>;

axios.defaults.baseURL = 'https://rsclone.com/api/v1';

const register =
  (credentials: Credentials) => async (dispatch: AppDispatch) => {
    dispatch(registerRequest());
    try {
      const response = await apiService.registerUser(credentials);
      dispatch(registerSuccess(response.data));
      if (response.code === 201) {
        toast.success(i18n?.t?.('toast.successReg'));
      }
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error(i18n?.t?.('toast.errorReg1'));
        } else {
          toast.error(i18n?.t?.('toast.errorReg2'));
        }
        dispatch(registerError(error.message));
      }
    }
  };

const logIn = (credentials: LoginCreds) => async (dispatch: AppDispatch) => {
  dispatch(loginRequest());
  try {
    const result = await apiService.loginUser(credentials);
    dispatch(loginSuccess(result.data));
    dispatch(setTokensSuccess(result.data.tokens));
    tokenService.setLocalTokens(result.data.tokens);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        toast.error(i18n?.t?.('toast.errorLog1'));
      } else {
        toast.error(i18n?.t?.('toast.errorLog2'));
      }
      dispatch(loginError(error.message));
    }
  }
};

const logOut = () => async (dispatch: AppDispatch) => {
  dispatch(logoutRequest());
  try {
    const result = await apiService.logoutUser();
    if (result.status === 204 || result.status === 401) {
      dispatch(logoutSuccess());
      tokenService.removeLocalTokens();
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      tokenService.removeLocalTokens();
      dispatch(logoutError());
      toast.error(error.message);
    }
  }
};

const getCurrent = () => async (dispatch: AppDispatch) => {
  dispatch(getCurrentUserRequest());
  try {
    const result = await apiService.getCurrentUser();
    if (result.code === 200) {
      dispatch(getCurrentUserSuccess(result.data));
      dispatch(setTokensSuccess(result.data.tokens));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      dispatch(getCurrentUserError());
    }
  }
};

const authOperations = {
  register,
  logIn,
  logOut,
  getCurrent,
};

export default authOperations;
