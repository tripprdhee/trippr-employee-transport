import { baseApiCall } from "../baseApi";

export const getOperatorList = async (data) => {
  const token = await localStorage.getItem("token");
  return baseApiCall({
    url: `bucket`,
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    data,
  });
};

export const getLocalOperatorList = async (data) => {
  const token = await localStorage.getItem("token");
  return baseApiCall({
    url: `bucket/local`,
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    data,
  });
};
export const getBusOperatorList = async (data) => {
  const token = await localStorage.getItem("token");
  return baseApiCall({
    url: `bucket/bus`,
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    data,
  });
};
