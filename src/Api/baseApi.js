import instance from ".";

export const baseApiCall = (config) => {
  return new Promise((resolve, reject) => {
    instance(config)
      .then((response) => {
        if (response.status === 202 || response.status === 200) {
          resolve(response.data);
        } else if (response.status === 201) {
          resolve(response);
        } else {
          reject(false);
        }
      })
      .catch((e) => {
        if (e.response) {
          reject(e.response);
        } else {
          reject(e.response);
        }
        reject(e.response);
      });
  });
};
