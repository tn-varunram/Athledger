import axios from 'axios';

const createRequest = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL,
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('athledgerToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default createRequest;
