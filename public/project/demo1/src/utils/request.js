import axios from "axios";
import { router } from "../router/index";
const request = axios.create({
  timeout: 1000 * 10 * 3,
  baseURL: "./api",
  withCredentials: true,
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return processResponse(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 接口返回错误统一处理
function processResponse(response) {
  if (response.data.code !== 200) {
    if (typeof response.data !== "object") {
      return Promise.reject({ msg: "接口返回JSON数据格式错误" });
    }
    // 登录token失效
    if (response.data.code === 401) {
      localStorage.removeItem("token");
      router.push("/login");
      return Promise.reject({ msg: "token失效,请重新登录" });
    }
    // 登录token失效
    if (response.data.code === 409) {
      localStorage.removeItem("token");
      router.push("/login");
    }
    // 网络异常处理
    if (!navigator.onLine) {
      return Promise.reject({ msg: "当前网络不可用，需检查你的网络设置" });
    }
    // 后端返回错误
    return Promise.reject(response.data);
  }
  return response.data;
}

export { request };
