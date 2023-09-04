import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.108:8080/api",
  // baseURL: "http://177.54.58.124:8080/api",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.data) {
        return Promise.reject(new AppError(error.response.data));
      }
    }
    return Promise.reject(error);
  }
);

export { api };
