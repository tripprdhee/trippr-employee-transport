import { baseApiCall } from "../baseApi";

export const addEmployee = async (data) => {
  const res =  localStorage.getItem("HR_LOGIN_INFO");
  const token =  localStorage.getItem("hrToken");
  const hr = JSON.parse(res)
  console.log(token)
  return baseApiCall({
    url: `employee-transport/hr/${hr._id}`,
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    data,
  });
};
export const editEmployee = async (data) => {
  const res =  localStorage.getItem("HR_LOGIN_INFO");
  const token =  localStorage.getItem("hrToken");
  const hr = JSON.parse(res)
  // console.log(token)
  return baseApiCall({
    url: `employee-transport/hr/${hr._id}/${data.id}`,
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    data,
  });
};
export const getEmployeeList = async () => {
  const res =  localStorage.getItem("HR_LOGIN_INFO");
  const hr = JSON.parse(res)
  const token =  localStorage.getItem("hrToken");
  return baseApiCall({
    url: `employee-transport/hr/${hr._id}/employee`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const deleteEmployeeList = async (id) => {
  const token = localStorage.getItem("hrToken");
  return  baseApiCall({
    url: `employee-transport/hr/employee/${id}`,
    method: "delete",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const addEditScheduleBucket = async (data) => {
  const res =  localStorage.getItem("HR_LOGIN_INFO");
  const hr = JSON.parse(res)
  const token =  localStorage.getItem("hrToken");
  return  baseApiCall({
    url: `employee-transport/bucket/schedule/${hr._id}/add`,
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    data
  });
};
export const getScheduleBucket = async () => {
  const res =  localStorage.getItem("HR_LOGIN_INFO");
  const hr = JSON.parse(res)
  const token =  localStorage.getItem("hrToken");
  return  baseApiCall({
    url: `employee-transport/bucket/schedule/${hr._id}`,
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const deleteScheduleBucket = async (id) => {
  const token =  localStorage.getItem("hrToken");
  return  baseApiCall({
    url: `employee-transport/bucket/${id}`,
    method: "delete",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};


