import axios from 'axios';

const apiUrl = 'https://localhost:44375/api';

const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
});

export function createJob(jobData) {
  return authAxios.post(`${apiUrl}/job/create`, jobData);
}
