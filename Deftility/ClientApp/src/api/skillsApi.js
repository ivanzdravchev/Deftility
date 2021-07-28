import axios from 'axios';

const apiUrl = 'https://localhost:44375/api';

export async function getAllSkills() {
  return await axios.get(`${apiUrl}/skill/all`);
}
