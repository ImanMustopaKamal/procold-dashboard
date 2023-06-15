import { axiosRequest, transformRequestOptions } from "../request";

export const createTransaction = (params) => {
  return axiosRequest.post('/transactions', params);
}