import Axios, { InternalAxiosRequestConfig } from 'axios';
import { env } from '~/utils/env';
import { enqueueSnackbar } from 'notistack';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.VITE_SERVER_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    enqueueSnackbar(message, { variant: 'error' });

    return Promise.reject(error);
  }
);
