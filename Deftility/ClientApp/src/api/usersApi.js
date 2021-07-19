import axios from 'axios';

const apiUrl = 'https://localhost:44375/api';

export function register(userData) {
  return axios.post(`${apiUrl}/user/register`, userData);
}

export function login(userData) {
  return axios.post(`${apiUrl}/user/login`, userData);
}