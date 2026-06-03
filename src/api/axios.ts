import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pfcabackend.wd-jo.com/api/frontend',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

    const NEWS_EVENT_URL = '/news-events';
    const newsEvents = await apiClient.get(NEWS_EVENT_URL);


export default apiClient;