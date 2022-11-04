import axios from 'axios';
import authAxios from './authAxios';
import { API_URL } from '../constants';

export function getAllJobs() {
  return axios.get(`${API_URL}/job/all`);
};

export function getJobDetails(jobId) {
  return axios.get(`${API_URL}/job/get/${jobId}`);
};

export function createJob(jobData) {
  return authAxios.post(`${API_URL}/job/create`, jobData);
}

export function getJobShortDetails(jobId) {
  return authAxios.get(`${API_URL}/job/getShortDetails/${jobId}`);
}

export function getAllUserJobs() {
  return authAxios.get(`${API_URL}/job/allUserJobs/`);
}
