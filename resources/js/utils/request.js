import '@/bootstrap';
import store from '@/store'
import { Message } from 'element-ui';
// import { isLogged, setLogged } from '@/utils/auth';

// Create axios instance
const service = window.axios.create({
  baseURL: process.env.MIX_BASE_API,
  timeout: 50000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
  config => {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response pre-processing
service.interceptors.response.use(
  response => {
    // if (response.headers.authorization) {
    //   setLogged(response.headers.authorization);
    //   response.data.token = response.headers.authorization;
    // }

    return response.data;
  },
  error => {
    let message = error.message;
    if (error.response.data && error.response.data.errors) {
      message = error.response.data.errors;
    } else if (error.response.data && error.response.data.error) {
      message = error.response.data.error;
    }

    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
