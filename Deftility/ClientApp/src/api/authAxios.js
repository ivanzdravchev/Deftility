import axios from 'axios';

const apiUrl = 'https://localhost:44375/api';

const authAxios = axios.create({
  baseURL: apiUrl
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default authAxios;
