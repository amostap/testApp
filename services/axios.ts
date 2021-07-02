import _axios from 'axios';

const axios = _axios.create();

axios.interceptors.request.use(data => ({
  ...data,
  baseURL: 'https://api.github.com',
}));

export default axios;
