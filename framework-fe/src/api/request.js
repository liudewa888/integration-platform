import axios from 'axios';
import { useUserStore } from '@/stores/user';
import router from '../router';
const service = axios.create({
  baseURL: '/api',
  timeout: 1000 * 10 * 3,
  withCredentials: true
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const user = userStore.user;
    if (user && user.token) {
      config.headers['token'] = user.token;
      config.headers['admin'] = user.admin;
    } else {
      console.log('user 不存在: ', user);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return processResponse(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 接口返回错误统一处理
function processResponse(response) {
  const userStore = useUserStore();
  if (response.data.code !== 200) {
    if (typeof response.data !== 'object') {
      return Promise.reject({ msg: '接口返回JSON数据格式错误' });
    }
    // 登录token失效
    if (response.data.code === 401) {
      userStore.removeUser();
      router.push('/login');
      return Promise.reject({ msg: 'token失效,请重新登录' });
    }
    // 网络异常处理
    if (!navigator.onLine) {
      return Promise.reject({ msg: '当前网络不可用，需检查你的网络设置' });
    }
    // 后端返回错误
    return Promise.reject(response.data);
  }
  return response.data;
}

const default_retryTimes = 0; // 重连次数
const default_retryDelay = 1000 * 3;
const MAX_COUNT = 5;
const requestQueue = [];
let activeCount = 0;

// 并发限制 + 请求重试
function processQueue() {
  if (activeCount < MAX_COUNT && requestQueue.length) {
    const { config, retryTimes, retryDelay, resolve, reject } = requestQueue.shift();
    activeCount++;
    service(config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (retryTimes === 0) {
          reject(error);
        } else {
          setTimeout(() => {
            requestQueue.push({ config, retryTimes: retryTimes - 1, retryDelay, resolve, reject });
          }, retryDelay);
        }
      })
      .finally(() => {
        activeCount--;
        processQueue();
      });
  }
}

function requestHandler(config, retryTimes = default_retryTimes, retryDelay = default_retryDelay) {
  return new Promise((resolve, reject) => {
    requestQueue.push({ config, retryTimes, retryDelay, resolve, reject });
    processQueue();
  });
}

service.get = (url, config) => {
  return requestHandler({ url, method: 'get', ...config });
};

service.post = (url, data, config) => {
  return requestHandler({ url, method: 'post', data, ...config });
};

export default service;
