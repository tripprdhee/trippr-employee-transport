import { baseApiCall } from "../baseApi";

export const loginAPI = (data) => {
  return baseApiCall({
    url: "employee-transport/auth/hr/login",
    method: "post",
    data,
  });
};

export const signUpAPI = (data) => {
  return baseApiCall({
    url: "employee-transport/auth/hr/register",
    method: "post",
    data,
  });
};

export const forgotPasswordApi = (data) => {
  return baseApiCall({
    url: "auth/customer/forgot-password",
    method: "post",
    data,
  });
};

export const otpVerificationApi = (data) => {
  return baseApiCall({
    url: "auth/customer/otp-verification",
    method: "post",
    data,
  });
};

export const resetPasswordApi = (data) => {
  return baseApiCall({
    url: "auth/customer/change-password",
    method: "post",
    data,
  });
};
