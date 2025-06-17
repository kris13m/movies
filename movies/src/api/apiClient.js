/*import axios from 'axios';
import { toast } from 'react-toastify';

// This is the configured axios instance that will be used by all API calls.
const axiosSingleton = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Crucial for session cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== Request Interceptor =====
// This runs BEFORE each request is sent.
axiosSingleton.interceptors.request.use(
  (config) => {

    /*
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
    
    const csrfToken = getCookie('csrf-token');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    
   
    config.headers['X-CSRF-Token'] = 'flag_csrf'; 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ===== Response Interceptor =====
// This runs AFTER a response is received, or if an error occurs.
axiosSingleton.interceptors.response.use(
  // If the response was successful (status 2xx), just pass it through.
  (response) => response,

  // If the response was an error, handle it here.
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || 'An unexpected error occurred.';

    // --- CRITICAL: Handle 401 Unauthorized ---
    // This is the most important part for session expiration.
    if (status === 401) {
      // Don't just show a toast. The user's session is invalid.
      // The most reliable way to "log out" is to force a full page redirect to login.
      // This clears all React state and ensures the user has to re-authenticate.
      window.location.href = '/login';

      // Return a new promise that never resolves to prevent the original
      // promise chain from continuing (e.g., to avoid a .catch() in your component
      // from firing and showing a confusing error message).
      return new Promise(() => {});
    }

    // Handle other common error statuses with user-friendly notifications.
    switch (status) {
      case 400: // Bad Request
        toast.error(message);
        break;
      case 403: // Forbidden
        toast.error(message || 'You do not have permission to perform this action.');
        break;
      case 404: // Not Found
        toast.error(message || 'The requested resource was not found.');
        break;
      case 409: // Conflict
        toast.warn(message);
        break;
      case 500: // Internal Server Error
        toast.error(message || 'A server error occurred. Please try again later.');
        break;
      default: // All other errors
        if (!error.response) {
            // This handles network errors (e.g., API is down)
            toast.error("Network error. Please check your connection or try again later.");
        } else {
            toast.error(message);
        }
        break;
    }

    // After showing a toast, reject the promise so that component-level
    // error handling (e.g., in React Query's `onError`) can still run.
    return Promise.reject(error);
  }
);

// This class is a great pattern for creating clients for specific API resources.
// Example: const movieClient = new ApiClient('/movies');
// It will automatically use the configured axiosSingleton with its interceptors.
class ApiClient {
  constructor(apiResource) {
    this.apiResource = apiResource;
  }

  getById(id) {
    return axiosSingleton
      .get(`${this.apiResource}/${id}`)
      .then((response) => response.data);
  }

  getAll(params) {
    return axiosSingleton
      .get(this.apiResource, { params })
      .then((response) => response.data);
  }

  create(data) {
    return axiosSingleton
      .post(this.apiResource, data)
      .then((response) => response.data);
  }
  
  update(id, data) {
    return axiosSingleton
      .put(`${this.apiResource}/${id}`, data)
      .then((response) => response.data);
  }

  delete(path = '') {
    return axiosSingleton
      .delete(`${this.apiResource}/${path}`)
      .then((response) => response.data);
  }
}

// --- EXPORTS ---

// Export the class as the default for creating resource-specific clients.
export default ApiClient;

// Export the configured singleton instance for direct use in services (like authService).
export { axiosSingleton };

*/

import axios from 'axios';
import { navigateTo } from '../services/navigation';
import { toast } from 'react-toastify';
import { getCookie } from '../utils/cookies';  // commented out since we won't use it

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


