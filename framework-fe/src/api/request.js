import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user';
import router from '../router';
const service = axios.create({
  baseURL: window.appConfig.baseURL,
  timeout: 10000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    const store = useUserStore();
    const user = store.user;
    if (user && user.F_token) {
      config.headers['F_token'] = user.F_token;
      config.headers['IsAdmin'] = user.IsAdmin;
    } else {
      console.log('user 不存在: ', user);
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.data.result == 'fail') {
      ElMessage({
        message: response.data.msg || 'Error',
        type: 'error',
        duration: 3000
      });
      return;
    }

    if (response.status === 401) {
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
    }
    // 自定义状态码
    if (res.result == 'warning') {
      ElMessage({
        message: res.msg || 'Warning',
        type: 'warning',
        duration: 3000
      });

      return res.data;
    } else {
      return res.data; // 这里是返回的数据
    }

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

export default service;
