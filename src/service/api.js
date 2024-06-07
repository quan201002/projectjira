import axios from "axios";
import { useDispatch } from "react-redux";
import { store } from "../index";
import { TOKEN } from "../redux/constant/SettingSystem";

export let https = axios.create({
  baseURL: "https://jiranew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1OCIsIkhldEhhblN0cmluZyI6IjE2LzA2LzIxMjQiLCJIZXRIYW5UaW1lIjoiMTcxODQ5NjAwMDAwMCIsIm5iZiI6MTY5MDM5MDgwMCwiZXhwIjoxNzE4NjQzNjAwfQ.McSLkQ57qlFLaU6XgzGxe9utuD1EYvyt3ckhhtVd2lg",
    Authorization: "Bearer " + localStorage.getItem(TOKEN),
  },
});
// useDispatch();
// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
