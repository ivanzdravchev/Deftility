import authAxios from './authAxios';

const apiUrl = 'https://localhost:44375/api';

export function createBid(bidData) {
  return authAxios.post(`${apiUrl}/bid/create`, bidData);
}

export function getAllJobBids(jobId) {
  return authAxios.get(`${apiUrl}/bid/allJobBids/${jobId}`);
}
