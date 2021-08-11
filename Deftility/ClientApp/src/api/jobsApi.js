import axios from 'axios';
import authAxios from './authAxios';

const apiUrl = 'https://localhost:44375/api';

export function getAllJobs() {
  return axios.get(`${apiUrl}/job/all`);
};

export function getJobDetails(jobId) {
  return axios.get(`${apiUrl}/job/get/${jobId}`);
};

export function createJob(jobData) {
  return authAxios.post(`${apiUrl}/job/create`, jobData);
}

export function getJobShortDetails(jobId) {
  return authAxios.get(`${apiUrl}/job/getShortDetails/${jobId}`);
}

export function getAllUserJobs() {
  return authAxios.get(`${apiUrl}/job/allUserJobs/`);
}
