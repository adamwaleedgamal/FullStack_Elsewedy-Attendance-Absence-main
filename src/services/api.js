import axios from 'axios';

const api = axios.create({
  baseURL: 'https://elsewedyschool.runasp.net/',
});

export default api;