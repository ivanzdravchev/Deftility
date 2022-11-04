import authAxios from './authAxios';
import { API_URL } from '../constants';

export function createBid(bidData) {
  return authAxios.post(`${API_URL}/bid/create`, bidData);
}

export function getAllJobBids(jobId) {
  return authAxios.get(`${API_URL}/bid/allJobBids/${jobId}`);
}
