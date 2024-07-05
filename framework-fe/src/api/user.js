import request from './request';

export function login(data) {
  // debugger
  return request({
    // url: '/api/Login/Login',
    url: '/api/Login/RSALogin',
    method: 'post',
    data: {
      loginType: data.loginType,
      UserName: data.username,
      UserPassword: data.password,
      funcCode: window.appConfig.funcCode,
      systemCode: window.appConfig.systemCode
    }
  });
}

export function GetPublicKey(data) {
  return request({
    url: '/api/Login/publicKey',
    method: 'get'
  });
}

export function ssoLogin(data) {
  return request({
    url: '/api/Login/SSOLogin',
    method: 'post',
    data: {
      // systemCode: data.systemCode,
      // funcCode: data.funcCode
      funcCode: window.appConfig.funcCode,
      systemCode: window.appConfig.systemCode,
      sso_token: sessionStorage.getItem('sso_token')
    }
  });
}
export function getInfo(data) {
  return request({
    url: '/api/Menu/GetUserInfo',
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
//     url: '/api/Menu/UpdatePwd',
//     method: 'post',
//     data: { UserID: store.getters.UserID, ...data }
//   })
// }

export function getRoute(data) {
  return request({
    url: '/api/Menu/GetUserMenu',
    method: 'post',
    data
  });
}
export function GetUserFun(data) {
  return request({
    url: '/api/Menu/GetUserFun',
    method: 'post',
    data
  });
}

export function systemTitle(params) {
  return request({
    url: '/api/parameter/HisName',
    method: 'get',
    params
  });
}

// 版本记录
export function version(params) {
  return request({
    url: '/api/version/' + window.appConfig.systemCode,
    method: 'get',
    params
  });
}