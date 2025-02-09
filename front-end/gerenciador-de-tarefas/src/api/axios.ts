// src/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default api;
/*
baseURL: 'http://localhost:5000/api': define a URL base da API, ou seja,

todas as requisições feitas usando essa instância vão começar com essa URL.
*/