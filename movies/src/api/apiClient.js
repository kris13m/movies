import axios from 'axios';
import { navigateTo } from '../services/navigation';
// import { getCookie } from '../utils/cookies';  // commented out since we won't use it

// Create a singleton axios instance
const axiosSingleton = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosSingleton.interceptors.request.use(config => {
  // const csrfToken = getCookie('csrf-token');  // commented out token retrieval

  // Instead of grabbing a token, just set a static flag
  config.headers['X-CSRF-Token'] = 'flag_csrf';
  console.log("CSRF token flag set to 'flag_csrf'");

  /*
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
    console.log("CSRF token added");
    console.log(csrfToken);
  }
  else{
    console.log("CSRF token not added");
  }
  */

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

  delete(path = '') {
    // If you want to delete e.g. /lists/123/movies/456, call delete('123/movies/456')
    return axiosSingleton
      .delete(`${this.apiResource}/${path}`)
      .then(response => response.data);
  }
}

export default ApiClient;