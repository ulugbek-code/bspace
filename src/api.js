import axios from 'axios';
import router from './router.js';
// import store from './store';

const customAxios = axios.create({
  baseURL: 'https://bspace.azurewebsites.net/api',
  timeout: 12000,
  headers: { Authorization: `Bearer ${localStorage.getItem('mytoken')}` }
});

const requestHandler = request => {
  request.headers.Authorization = `Bearer ${localStorage.getItem('mytoken')}`;
  return request;
};

const errorHandler = error => {
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  request => requestHandler(request),
  error => errorHandler(error)
);

customAxios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // Do something with response error
    if (error.response.status === 404) {
      // store.commit('toggleActivity');
      router.push('/notFound');
    } else if (error.response.status === 401) {
      // store.commit('toggleActivity');
      localStorage.clear();
      router.push('/signIn');
    }
    return Promise.reject(error);
  }
);

export default customAxios;
