// for building the api urls
import axios from 'axios';

// Create a singleton axios instance
const axiosSingleton = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to include Authorization header automatically
axiosSingleton.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Adjust if you store it elsewhere
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
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
}

export default ApiClient;