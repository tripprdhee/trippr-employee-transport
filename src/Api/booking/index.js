import { baseApiCall } from "../baseApi";

export const bookVehicle = async (data) => {
  const token = await localStorage.getItem("token");
  return baseApiCall({
    url: `/vehicle-booking`,
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    data,
  });
};
