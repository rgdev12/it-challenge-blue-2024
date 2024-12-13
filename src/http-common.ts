import axios from 'axios';
import { VITE_API_HOST } from '@/config';

const apiClient = axios.create({
  baseURL: `${VITE_API_HOST}/api`,
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
