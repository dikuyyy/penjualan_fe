import axios from "axios";

const baseUrl = import.meta.env.VITE_BE_URL;
const getHeaders = ({
                      isMultipartForm
                    }) => {
  let obj = {};
  if (isMultipartForm) {
    obj['Content-Type'] = 'multipart/form-data'
  }
  return obj;
}
export const get = ({
                      path,
                      params,
                      isMultipartform = false
                    }) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: baseUrl,
      url: path,
      method: 'get',
      params,
      headers: getHeaders({isMultipartform})
    })
      .then(response => {
        if (response.data) {
          resolve(response.data);
        }
      })
      .catch(async error => {
        reject(error.response?.data);
      });
  });
};

export const post = ({
                       path,
                       params,
                       isMultipartForm = false
                     }) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: baseUrl,
      url: path,
      method: 'post',
      data: params,
      headers: getHeaders({isMultipartForm})
    })
      .then(response => {
        if (response.data) {
          resolve(response.data);
        }
        throw new Error('Terjadi kesalahan');
      })
      .catch(async error => {
        reject(error.response?.data);
      });
  })
}

export const put = ({
                       path,
                       params,
                       isMultipartForm = false
                     }) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: baseUrl,
      url: path,
      method: 'put',
      data: params,
      headers: getHeaders({isMultipartForm})
    })
      .then(response => {
        if (response.data) {
          resolve(response.data);
        }
        throw new Error('Terjadi kesalahan');
      })
      .catch(async error => {
        reject(error.response?.data);
      });
  })
}

export const del = ({ path, params, isMultipartForm = false })=> {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: baseUrl,
      url: path,
      method: 'delete',
      params,
      headers: getHeaders({ isMultipartForm })
    })
      .then((response) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject('No data found');
        }
      })
      .catch(async (error) => {
        reject(error.response?.data);
      });
  });
};
