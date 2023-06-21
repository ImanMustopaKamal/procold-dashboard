import { axiosRequest, transformRequestOptions } from "../request";

export const megatron = (params) => {
  return axiosRequest.get("/megatrons", {
    params: params,
    paramsSerializer: (params) => transformRequestOptions(params),
  });
};