import axios from 'axios';
import { API_URL } from '../constants';

export async function getAllCategories() {
  return await axios.get(`${API_URL}/category/all`);
}
