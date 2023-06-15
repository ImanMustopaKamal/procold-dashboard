import axios from 'axios';
// import { useSession } from 'next-auth/react';
// const { data: session, status } = useSession();
// console.log("session: ", session);

export const axiosRequest = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_VERSION}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export const transformRequestOptions = (params) => {
  let options = "";
  for (const key in params) {
    if (typeof params[key] !== "object" && params[key]) {
      options += `${key}=${params[key]}&`;
    } else if (
      typeof params[key] === "object" &&
      params[key] &&
      params[key].length
    ) {
      params[key].forEach((el) => {
        options += `${key}=${el}&`;
      });
    }
  }
  return options ? options.slice(0, -1) : options;
};

axiosRequest.interceptors.request.use(
  (config) => {
    const token = "huhuyy";
    // const token = localStorage.getItem("_auth_token");
    config.params = {
      ...config.params,
    };
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosRequest.defaults.headers.common['Authorization'];
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export const axiosRequestFile = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_VERSION}`,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

axiosRequestFile.interceptors.request.use(
  (config) => {
    console.log("config: ", config)
    const token = "huhuyy";
    // const token = localStorage.getItem("_auth_token");
    config.params = {
      ...config.params,
    };
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosRequestFile.defaults.headers.common['Authorization'];
    }
    return config;
  },

  (error) => Promise.reject(error)
);