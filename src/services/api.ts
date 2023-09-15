import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://192.168.15.106:8080/api",
  // baseURL: "http://177.54.58.124:8080/api",
}) as APIInstanceProps;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (requestError) => {
      if (requestError?.response?.status === 401) {
        requestError.response.data.title = "Sua sessão expirou!";
        console.log("caiu token: ", requestError.response);
        signOut();
      }

      if (requestError.response && requestError.response.data) {
        console.log("caiu data api: ", requestError.response.data);
        console.log("caiu erro api: ", requestError.response.data.title);
        return Promise.reject(new AppError(requestError.response.data.title));
      }
      return Promise.reject(requestError);
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
