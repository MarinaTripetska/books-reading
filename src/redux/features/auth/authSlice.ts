import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  user: { name: string };
  accessToken: string;
  refreshToken: string;
  error: string;
  isRegistered: boolean;
  isRefreshed: boolean;
  isLoggedOn: boolean | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

const initialUserState: UserState = {
  user: { name: '' },
  accessToken: '',
  refreshToken: '',
  error: '',
  isRegistered: false,
  isRefreshed: false,
  isLoggedOn: undefined,
  isLoading: false,
  isFetching: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialUserState,
  reducers: {
    //sign up
    registerRequest: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, { payload }) => {
      state.user.name = payload.user.name;
      state.isLoading = false;
      state.isRegistered = true;
    },
    registerError: (state, { payload }) => {
      state.error = payload.message;
      state.isLoading = false;
      state.isRegistered = false;
    },

    //sign in
    loginRequest: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.user.name = payload.user.name;
      state.accessToken = payload.tokens.accessToken;
      state.refreshToken = payload.tokens.refreshToken;
      state.isLoading = false;
      state.isLoggedOn = true;
    },
    loginError: (state, { payload }) => {
      state.error = payload.message;
      state.isLoading = false;
      state.isLoggedOn = false;
    },

    //log out
    logoutRequest: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.user.name = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.isRefreshed = false;
      state.isLoading = false;
      state.isLoggedOn = false;
    },
    logoutError: (state) => {
      state.isLoading = false;
    },

    getCurrentUserRequest: (state) => {
      state.isLoading = true;
      state.isFetching = true;
      state.isLoggedOn = undefined;
    },
    getCurrentUserSuccess: (state, { payload }) => {
      state.user.name = payload.user.name;
      state.accessToken = payload.tokens.accessToken;
      state.refreshToken = payload.tokens.refreshToken;
      state.isLoading = false;
      state.isLoggedOn = true;
      state.isFetching = false;
    },
    getCurrentUserError: (state) => {
      state.isLoading = false;
      state.isLoggedOn = false;
      state.isFetching = false;
    },

    setTokensRequest: (state) => {
      state.isLoading = true;
    },
    setTokensSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    setTokensError: (state) => {
      state.isLoading = false;
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const {
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
  setTokensRequest,
  setTokensSuccess,
  setTokensError,
} = authSlice.actions;

export default authSlice.reducer;
