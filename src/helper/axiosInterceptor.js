import axios from "axios";
import { AppConfigs } from "../utils/envUtil.js";

const getAxios = (specificBaseUrl) => {
  const instance = axios.create();

  if (specificBaseUrl) {
    instance.defaults.baseURL = specificBaseUrl;
  } else {
    instance.defaults.baseURL = AppConfigs.apiBaseUrl;
  }

  // interceptors Request------------------------------------
  instance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("token") || "";

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: "bearer " + token,
        };
      }
      return config;
    },
    async (error) => {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  );

  //validating the token expiration scenario --------------------------
  // interceptors Response------------------------------------
  instance.interceptors.response.use(
    async (Response) => {
      return Response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        //dispatch action using store to show token expire popup-----
        localStorage.removeItem("token");
        window.location.pathname = "/";

        return new Promise((resolve, reject) => {
          reject(error);
        });
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return instance;
};

export default getAxios;
