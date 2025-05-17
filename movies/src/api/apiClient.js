// for building the api urls
import axios from 'axios';
import { navigateTo } from '../services/navigation';

// Create a singleton axios instance
const axiosSingleton = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});


axiosSingleton.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosSingleton.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    navigateTo("/login");
  }
  return Promise.reject(error);
});

class ApiClient {
  constructor(apiResource) {
    this.apiResource = apiResource; // e.g., "/users"
  }

  getById(id) {
    return axiosSingleton
      .get(`${this.apiResource}/${id}`)
      .then(response => response.data);
  }

  getAll(params) {
    return axiosSingleton
      .get(this.apiResource, { params })
      .then(response => response.data);
  }

  create(data) {
    console.log(this.apiResource);

    return axiosSingleton
      .post(this.apiResource, data)
      .then(response => response.data);
  }

  

  
}

export default ApiClient;