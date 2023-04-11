type TokensType = {
  accessToken: string;
  refreshToken: string;
};

const getLocalRefreshToken = () => {
  return JSON.parse(localStorage.getItem('REFRESH_TOKEN') as string);
};

const getLocalAccessToken = () => {
  return JSON.parse(localStorage.getItem('AUTH_TOKEN') as string);
};

const setLocalTokens = (tokens: TokensType) => {
  localStorage.setItem('AUTH_TOKEN', JSON.stringify(tokens.accessToken));
  localStorage.setItem('REFRESH_TOKEN', JSON.stringify(tokens.refreshToken));
};

const removeLocalTokens = () => {
  localStorage.removeItem('AUTH_TOKEN');
  localStorage.removeItem('REFRESH_TOKEN');
};

const tokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  setLocalTokens,
  removeLocalTokens,
};

export default tokenService;
