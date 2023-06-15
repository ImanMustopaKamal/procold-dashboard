import { axiosRequest, transformRequestOptions } from "../request";

export const getMessage = (params) => {
  return axiosRequest.get('/messages', {
    params: params,
    paramsSerializer: (params) => transformRequestOptions(params)
  });
}

// export function getMessage(payload) {
//   console.log("payload: ", payload)
//   return axiosRequest.get('/messages', payload);
// }