import { axiosRequest, axiosRequestFile, transformRequestOptions } from "../request";

export const uploadPhoto = (params) => {
  return axiosRequestFile.post('/photos', params);
}