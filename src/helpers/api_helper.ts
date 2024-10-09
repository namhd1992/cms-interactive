import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import config from "../config";
import { getToken } from "../Components/Hooks/IdentityHooks";

const { api } = config;
//const sessionStorageKey = "authUser";

// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.headers["lang"] = "vi";
axios.defaults.headers["osType"] = "IOS";
axios.defaults.headers["deviceId"] = "00811E96-8F17-463E-8E73-4804E9DE5B55";
axios.defaults.headers["deviceName"] = "Undefined";
axios.defaults.headers["appVersion"] = "1.0.0";
axios.defaults.headers["osVersion"] = "0";
axios.defaults.headers["requestId"] = "99999";
axios.defaults.headers["deviceType"] = "21";
axios.defaults.headers["buildNumber"] = "0";
axios.defaults.headers["agentId"] = "0";
axios.defaults.headers["appId"] = config.tenant.APP_ID;

// content type
// const authUser: any = sessionStorage.getItem(sessionStorageKey)
// const token = JSON.parse(authUser) ? JSON.parse(authUser).token : null;
// const authUser: any = sessionStorage.getItem(sessionStorageKey)
// const token = JSON.parse(authUser) ? JSON.parse(authUser).data.access_token : null;
const token = getToken();

if (token)
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token : string) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

const setHeader = (key : string, value: string) => {
  axios.defaults.headers.common[key] = value;
};

class APIClient {
  /**
   * Fetches data from the given URL
   */
  get = (url: string, params?: any): Promise<AxiosResponse> => {
    let response: Promise<AxiosResponse>;

    let paramKeys: string[] = [];

    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };

  /**
   * Posts the given data to the URL
   */
  create = (url: string, data: any): Promise<AxiosResponse> => {
    return axios.post(url, data);
  };

  /**
   * Updates data
   */
  update = (url: string, data: any): Promise<AxiosResponse> => {
    return axios.patch(url, data);
  };

  put = (url: string, data: any): Promise<AxiosResponse> => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios.delete(url, { ...config });
  };
}

// const getLoggedinUser = () => {
//   const user = sessionStorage.getItem(sessionStorageKey);

//   var userInfo = JSON.parse(user);    

//   if (!user || userInfo.code < 1) {
//     return null;
//   } else {
//     return userInfo;
//   }

    // const user = {
    //     "status": "success",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWYxNWM3NzBhNDcwYTIzMGNjNWQ1YSIsImlhdCI6MTcyNjYzMTc5MSwiZXhwIjoxNzM0NDA3NzkxfQ.9hKpq-7EtybRpY7K0nTGgYDmRvvdTXYBHsUMv-Xlcic",
    //     "data": {
    //         "_id": "629f15c770a470a230cc5d5a",
    //         "first_name": "User",
    //         "email": "admin@themesbrand.com",
    //         "password": "$2a$12$tOmV5oSs.Itd7KZ6IEV3L.kDnDZz9N2TadTrrnu0M/9ktxplL/lzC",
    //         "confirm_password": "123456",
    //         "changePasswordAt": "2022-06-07T09:06:27.077Z",
    //         "skills": [],
    //         "__v": 1,
    //         "passwordtoken": "f13946e79a11a976408622eda85c422f97fa8c8d52ec25204b6b279c8f2ffe32",
    //         "passwordtokenexp": "2024-09-14T17:00:23.996Z",
    //         "exp_year": [],
    //         "portfolio": []
    //     }
    // };
    // return user;
//};

// export const getToken = () => {
//   const userInfo = getLoggedinUser();

//   if (!userInfo || userInfo.code < 1) {
//     return null;
//   } else {
//     return userInfo.data.access_token;
//   }   
// };

export { APIClient, setAuthorization, setHeader }; //getLoggedinUser