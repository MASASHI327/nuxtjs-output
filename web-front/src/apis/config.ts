import axios, { type AxiosError } from "axios";

const BASE_API_URL = "http://localhost:8080";

export interface ResponseType<T = undefined> {
  code: number;
  data?: T;
  message?: string;
}

export interface IErrorResponse {
  code: string;
  config: unknown;
  message: string;
  request: unknown;
  response: {
    config: unknown;
    data: {
      error: string;
      message: string;
      statusCode: string;
    };
    headers: unknown;
    request: unknown;
    status: number;
    statusText: string;
  };
}


const getToken = () =>
  localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : null;

const getAuthorizationHeader = () => `Bearer ${getToken()}`;



export const globalAxios = axios.create({
  baseURL: `${BASE_API_URL}/api`,
  timeout: 100000,
  headers: {
    "Content-type": "application/json",
  },
});


globalAxios.interceptors.request.use((config) => {
  if (config?.headers) {
    config.headers["Authorization"] = getAuthorizationHeader();
  }
  return config;
});


export default globalAxios;

export const isAxiosError = (error: unknown): error is AxiosError =>
  (error as AxiosError).isAxiosError;