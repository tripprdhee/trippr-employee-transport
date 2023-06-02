import axios from "axios";

const instance = axios.create({
   baseURL: "https://trippr-dev-64zvm7t2wa-em.a.run.app/api/v1/",
  // baseURL: "https://trippr-production-64zvm7t2wa-em.a.run.app/api/v1/",
});

export const imageURL = "https://prod-api-lfvfx.ondigitalocean.app/files/";
export const razorPayApiKey = "rzp_live_kXOBGW6Hz9Jk19";
// export const razorPayApiKey = "rzp_test_mNDj2X1KPHf2Ft";

instance.defaults.headers.post["Content-Type"] = "application/json";

// REQUEST INTERCEPTOR
instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.error("Error from Request Interceptor: ", error.respo);
  }
);

// RESPONSE INTERCEPTOR
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
