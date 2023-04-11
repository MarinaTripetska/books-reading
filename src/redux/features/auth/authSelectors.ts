import { RootState } from '../../app/store';

const getIsRegistered = (state: RootState) => state.auth.isRegistered;

const getLoggedOn = (state: RootState) => state.auth.isLoggedOn;

const getUserName = (state: RootState) => state.auth.user.name;

const getUserAccessToken = (state: RootState) => state.auth.accessToken;

const getUserRefreshToken = (state: RootState) => state.auth.refreshToken;

const getIsRefresh = (state: RootState) => state.auth.isRefreshed;

const getLoading = (state: RootState) => state.auth.isLoading;

const getFetching = (state: RootState) => state.auth.isFetching;

const authSelectors = {
  getLoggedOn,
  getUserName,
  getUserAccessToken,
  getUserRefreshToken,
  getLoading,
  getIsRefresh,
  getIsRegistered,
  getFetching,
};

export default authSelectors;
