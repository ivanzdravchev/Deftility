import axios from 'axios';

const apiUrl = 'https://localhost:44375/api';

const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
});

export function createBid(bidData) {
  return authAxios.post(`${apiUrl}/bid/create`, bidData);
}

export function getAllJobBids(jobId) {
  return authAxios.get(`${apiUrl}/bid/allJobBids/${jobId}`);
}
