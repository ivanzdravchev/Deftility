import axios from 'axios';
import { API_URL, AUTH_COOKIE_NAME } from '../constants';
import { getCookieValue } from '../utils';

const authAxios = axios.create({
  baseURL: API_URL
});

authAxios.interceptors.request.use(
  (config) => {
    const token = getCookieValue(AUTH_COOKIE_NAME);
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default authAxios;
