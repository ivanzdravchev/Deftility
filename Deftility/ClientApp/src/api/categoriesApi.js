import axios from 'axios';

const apiUrl = 'https://localhost:44375/api';

export async function getAllCategories() {
  return await axios.get(`${apiUrl}/category/all`);
}
