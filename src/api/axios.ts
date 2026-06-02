import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pfcabackend.wd-jo.com/api/frontend',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default apiClient;