

import axios from 'axios';
import { navigateTo } from '../services/navigation';
import { toast } from 'react-toastify';
import { getCookie } from '../utils/cookies'; 

// Create a singleton axios instance
const axiosSingleton = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosSingleton.interceptors.request.use(config => {
  // const csrfToken = getCookie('csrf-token');  


  config.headers['X-CSRF-Token'] = 'flag_csrf';


  /*
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  */

  return config;
}, error => {
  return Promise.reject(error);
});

axiosSingleton.interceptors.response.use(
  response => response,
  error => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    switch (status) {
      case 400:
        toast.error(message || 'Invalid request.');
        break;
      case 403:
        toast.error(message || 'Forbidden.');
        break;
      case 404:
        toast.error(message || 'Not found.');
        break;
      case 409:
        toast.warn(message || 'Conflict occurred.');
        break;
      case 500:
        toast.error(message || 'Server error. Try again later.');
        break;
      case 401:
        navigateTo("/login");
        break;
      default:
        toast.error(message || 'Unexpected error occurred.');
        break;
    }

    return Promise.reject(error);
  }
);

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

  delete(path = '') {
    return axiosSingleton
      .delete(`${this.apiResource}/${path}`)
      .then(response => response.data);
  }
}

export default ApiClient;


