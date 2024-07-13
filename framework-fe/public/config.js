window.appConfig = {
  // baseURL: 'http://172.16.97.151:33355/', // 生产
  baseURL: 'http://10.1.12.100:33355/', // 开发
  iframe_url: ['/dist1', '/dist2', '/dist3', '/dist4'], // 生产环境
  defaultRouter: '/', // 登录后业务部分的默认路由页面  默认页对应数据库得排序 必须是0(必须是1级菜单的路由)
  funcCode: 'big_data',
  systemCode: '302', // 所属的系统ID(system_code)
  HisName: '| 演示平台',
  EncryptionCount: 32, // 加密位数
  MainMenuStyle: 'Top', // 主菜单显示位置,可选值: Top,Left
  MenuTopID: '120', // 菜单所属系统的菜单ID 开发
  showTopMenu: true // 展示头部菜单
};
