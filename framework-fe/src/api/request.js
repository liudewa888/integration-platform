import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user';
import router from '../router';
const service = axios.create({
  baseURL: '',
  timeout: 10000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    const store = useUserStore();
    const user = store.user;
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
    // const res = response.data;
    // if (response.data.result == 'fail') {
    //   ElMessage({
    //     message: response.data.msg || 'Error',
    //     type: 'error',
    //     duration: 3000
    //   });
    //   return;
    // }

    // if (response.status === 401) {
    //   ElMessageBox.confirm('你已经退出登录, 需要重新登录吗？', '提示', {
    //     confirmButtonText: '重新登录',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     router.push('/login');
    //     // store.dispatch('user/resetToken').then(() => {
    //     //   router.push('/login');
    //     // });
    //   });
    // }
    // // 自定义状态码
    // if (res.result == 'warning') {
    //   ElMessage({
    //     message: res.msg || 'Warning',
    //     type: 'warning',
    //     duration: 3000
    //   });

    //   return res.data;
    // } else {
    //   return res.data; // 这里是返回的数据

    // }
    return processResponse(response);
    // 自定义状态码
    // if (res.result !== 'success') {
    //   Message({
    //     message: res.data || 'Error',
    //     type: 'error',
    //     duration: 10000
    //   })

    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res.data // 这里是返回的数据
    // }
  },

  (error) => {
    if (error.toString().indexOf('401') != -1) {
      ElMessageBox.confirm('你已经退出登录, 需要重新登录吗？', '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        router.push('/login');
        // store.dispatch('user/resetToken').then(() => {
        //   router.push('/login');
        // });
      });
    } else {
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      });
    }

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
    request(config)
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
