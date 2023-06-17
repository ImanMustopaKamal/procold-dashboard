import {
  axiosRequest,
  axiosRequestFile,
  transformRequestOptions,
} from "../request";

// export const getAllPhoto = (params) => {
//   return axiosRequest.get('/admin/transactions', params);
// }

export const getAllPhoto = (params) => {
  return axiosRequest.get("/admin/transactions", {
    params: params,
    paramsSerializer: (params) => transformRequestOptions(params),
  });
};

export const selectedPhoto = (params, payload) => {
  return axiosRequest.put("/admin/transactions/" + params, payload);
};

export const uploadPhoto = (params) => {
  return axiosRequestFile.post("/photos", params);
};
