import axios from 'axios';
import { API_URL } from '../constants';

export async function getAllSkills() {
  return await axios.get(`${API_URL}/skill/all`);
}
