import axios from 'axios';
import { API_URL } from '../constants';

export function register(userData) {
  return axios.post(`${API_URL}/user/register`, userData);
}

export function login(userData) {
  return axios.post(`${API_URL}/user/login`, userData);
}
