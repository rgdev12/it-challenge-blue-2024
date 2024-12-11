import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'https://tu-dominio-api.com',
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
