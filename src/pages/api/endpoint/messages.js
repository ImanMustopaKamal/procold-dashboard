import { axiosRequest, transformRequestOptions } from "../request";

export const getMessage = (params) => {
  return axiosRequest.get('/messages', {
    params: params,
    paramsSerializer: (params) => transformRequestOptions(params)
  });
}

export const getMessageByID = (params) => {
  return axiosRequest.get(`/admin/messages/${params}`);
}

export const updatedMessage = (params, payload) => {
  return axiosRequest.put("/admin/messages/" + params, payload);
};

export const createdMessage = (payload) => {
  return axiosRequest.post("/admin/messages", payload);
};

export const deletedMessage = (params) => {
  return axiosRequest.delete(`/admin/messages/${params}`);
};

// export function getMessage(payload) {
//   console.log("payload: ", payload)
//   return axiosRequest.get('/messages', payload);
// }