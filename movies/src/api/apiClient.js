// for building the api urls
import axios from 'axios';

const axiosSingleton = axios.create({ // base url
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

class ApiClient {
  constructor(apiResource) { // api resource
    this.apiResource = apiResource;
  }

  getById(id) {
    return axiosSingleton.get(`${this.apiResource}/${id}`).then(response => response.data);
  }

  getAll() {
    return axiosSingleton.get(this.apiResource).then(response => response.data);
  }
}

export default ApiClient;