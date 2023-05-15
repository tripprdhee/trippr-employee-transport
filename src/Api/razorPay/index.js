import { baseApiCall } from "../baseApi";

export const createRazorPayOrder = (data) => {
  return baseApiCall({
    url: `/razorpay/generate-order`,
    method: "post",
    data,
  });
};
