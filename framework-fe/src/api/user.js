import request from './request';

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      loginType: data.loginType,
      uname: data.username,
      password: data.password,
      funcCode: window.appConfig.funcCode,
      systemCode: window.appConfig.systemCode
    }
  });
}

export function GetPublicKey(data) {
  return request({
    url: '/Login/publicKey',
    method: 'get'
  });
}

export function ssoLogin(data) {
  return request({
    url: '/admin/SSOLogin',
    method: 'post',
    data: {
      funcCode: window.appConfig.funcCode,
      systemCode: window.appConfig.systemCode,
      sso_token: sessionStorage.getItem('sso_token')
    }
  });
}
export function getInfo(data) {
  return request({
    url: '/Menu/GetUserInfo',
    method: 'post',
    data
  });
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}

// export function apiUpdatePwd(data) {
//   return request({
//     url: '/Menu/UpdatePwd',
//     method: 'post',
//     data: { UserID: store.getters.UserID, ...data }
//   })
// }

export function getRoute(params) {
  return request.get('/getMenus', { params });
}
export function GetUserFun(data) {
  return request({
    url: '/Menu/GetUserFun',
    method: 'post',
    data
  });
}

export function systemTitle(params) {
  return request({
    url: '/parameter/HisName',
    method: 'get',
    params
  });
}

// 版本记录
export function version(params) {
  return request({
    url: '/version/' + window.appConfig.systemCode,
    method: 'get',
    params
  });
}
