import {
  axiosRequest,
  transformRequestOptions,
} from "../request";

export const getSetting = (params) => {
  return axiosRequest.get("/admin/settings", {
    params: params,
    paramsSerializer: (params) => transformRequestOptions(params),
  });
};

export const updateSetting = (params, payload) => {
  return axiosRequest.put("/admin/settings/" + params, payload);
};