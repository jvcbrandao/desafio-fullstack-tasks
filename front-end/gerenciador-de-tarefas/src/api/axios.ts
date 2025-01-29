// src/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Substitua pela URL da sua API
});

export default api;
