window.appConfig = {
  baseURL: 'http://10.1.12.100:33355/', // 开发
  iframe_url: ['dist1', 'http://localhost:9083', '/dist3', '/dist4'], // 生产环境
  defaultRouter: '/home', // 系统第一个项目的首页路由
  funcCode: 'big_data',
  systemCode: '302', // 所属的系统ID(system_code)
  MenuTopID: '120', // 顶级菜单ID(系统的菜单ID) 开发
  systemName: '| 演示平台',
  EncryptionCount: 32, // 加密位数
  MainMenuStyle: 'Top', // 主菜单显示位置,可选值: Top,Left
  showTopMenu: true // 展示头部菜单
};
