// import { ElMessage } from 'element-plus';

const errorType = {
  vue: '捕获组件错误',
  error: '捕获javascrpit错误',
  unhandledrejection: '捕获javascrpit异步错误',
};
// 错误捕获处理函数
const errorHandler = (type, error) => {
  if (!error) return;
  console.error(errorType[type]);
  console.error(error);
  // ElMessage.error((error && (error.msg || error.message)) || '未知错误');
};

// 全局组件异常处理
export const vueErrorHandler = {
  install: Vue => {
    Vue.config.errorHandler = error => {
      errorHandler('vue', error);
    };
  },
};

// js错误和资源加载错误处理
window.addEventListener('error', function (event) {
  errorHandler('error', event.error);
});

// js异步错误处理
window.addEventListener('unhandledrejection', function (event) {
  errorHandler('unhandledrejection', event.reason);
});