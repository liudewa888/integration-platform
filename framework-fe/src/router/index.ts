import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index';
import { getRoute } from '@/api/user';
import { useUserStore } from '@/stores/user';
import { useMenusStore } from '@/stores/menus';
import { useAppStore } from '@/stores/app';
import { useBreadcrumbStore } from '@/stores/breadcrumb';

const systemCode = window.appConfig.systemCode;
const MenuTopID = window.appConfig.MenuTopID;
const redirectRoute = window.appConfig.defaultRouter;
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index')
    },
    {
      path: '/noMenuAccess',
      component: () => import('@/views/NoMenuAccess')
    },
    {
      path: '/',
      redirect: redirectRoute,
      component: Layout,
      children: [
        {
          path: '/:catchAll(.*)',
          component: () => import('@/views/Home')
        }
      ]
    }
  ]
});

const transformProperty = (item) => {
  item.ParentID = item.parent_id;
  item.FuncCode = item.menu_id;
  item.SeqNo = item.menu_order;
  item.menuOrder = item.menu_order;
  item.FuncType = item.menu_type;
  item.Url = item.menu_url;
  item.FuncName = item.menu_name;
  item.FuncIcon = item.menu_icon;
  item.FuncID = item.menu_id;
};
const filterAsyncRoutes = (data, rootID) => {
  const tree = {};
  data.forEach((item) => {
    if (!tree[item.ParentID]) {
      tree[item.ParentID] = [];
    }
    tree[item.ParentID].push(item);
  });

  const build = (parentId) => {
    if (tree[parentId]) {
      tree[parentId].sort((a, b) => {
        return a.menuOrder - b.menuOrder;
      });
      return tree[parentId].map((item) => {
        const node = {};
        node.path = item.Url || '';
        node.name = item.FuncCode || '';
        node.funcType = item.FuncType;
        node.parentID = item.ParentID;
        node.title = item.FuncName;
        node.id = item.FuncCode;
        node.menuOrder = item.SeqNo;
        node.meta = {
          seqNo: item.SeqNo,
          title: item.FuncName || '',
          icon: item.FuncIcon || '',
          id: item.FuncID || '',
          funcType: item.FuncType || ''
        };
        node.children = build(item.FuncID);
        return node;
      });
    } else {
      return [];
    }
  };

  return build(rootID);
};
const generateRoutes = async () => {
  const userStore = useUserStore();
  const appStore = useAppStore();
  const user = userStore.user;
  const params = {
    userId: user.id,
    // admin: user.admin,
    systemCode: systemCode
  };
  const { data: menuData } = await getRoute(params);
  if (menuData && menuData.length) {
    appStore.setSystemName(menuData[0].menu_name);
  }
  menuData.forEach(transformProperty);
  const { data: topMenuData } = await getRoute({
    ...params,
    menuType: 1
  });
  topMenuData.forEach(transformProperty);

  return new Promise((resolve) => {
    let accessedRoutes = [];
    let topMenus = [];
    let leftMenus = [];
    if (menuData && menuData.length) {
      accessedRoutes = filterAsyncRoutes(menuData, MenuTopID);
      leftMenus = accessedRoutes.map((item) => item.children);
    }
    if (topMenuData && topMenuData.length) {
      topMenus = filterAsyncRoutes(topMenuData, MenuTopID);
    }
    resolve({ menus: accessedRoutes, leftMenus, topMenus });
  });
};
function findPath(list, targetPath) {
  for (let obj of list) {
    if (obj.path === targetPath) {
      return true;
    }
    if (obj.children && obj.children.length) {
      const result = findPath(obj.children, targetPath);
      if (result) return true;
    }
  }
  return false;
}
function findRouterByPath(data, path) {
  const result = [];

  // 递归函数，用于查找元素
  function search(element, parentPath) {
    if (element.path === path) {
      const titles = parentPath.map((parent) => {
        return { title: parent.title, path: parent.path };
      });
      titles.push({ title: element.title, path: element.path });
      result.push(...titles);
    }

    if (element.children) {
      element.children.forEach((child) => search(child, [...parentPath, element]));
    }
  }

  // 开始搜索
  data.forEach((element) => search(element, []));

  return result;
}
let jumpNum = 0;
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const menusStore = useMenusStore();
  const breadcrumbStore = useBreadcrumbStore();
  const whiteList = ['/login', '/ssoLogin', '/noMenuAccess'];
  if (whiteList.includes(to.path)) {
    next();
    return;
  }
  if (!userStore.getUser() && to.path !== '/login') {
    next('/login');
  } else {
    if (menusStore.menus && menusStore.menus.length) {
      const activeProjectIndex = menusStore.topMenuActiveIndex;
      const menus = menusStore.menus;
      const leftMenus = menusStore.leftMenus;
      const currentMenus = menus[activeProjectIndex];
      const currentLeftMenus = leftMenus[activeProjectIndex];
      const hasPath = findPath([currentMenus], to.path);
      if (hasPath) {
        jumpNum = 0;
        const breadcrumbData = findRouterByPath(currentLeftMenus, to.path);
        breadcrumbStore.setBreadcrumbData(breadcrumbData);
        menusStore.setLeftMenusActiveRoute(to.path);
        next();
      } else {
        jumpNum++;
        if (jumpNum > 3) {
          next(false);
          Promise.reject({ msg: '禁止路由跳转,请检查配置文件首个系统首页路由是否正确' });
        }
        menusStore.setTopMenuActiveIndex(0);
        next('/');
      }
    } else {
      const res = await generateRoutes();
      if (!res.menus || !res.menus.length) {
        next('/noMenuAccess');
        return;
      }
      console.log(res.leftMenus, 'menus');

      menusStore.setMenus(res.menus);
      menusStore.setTopMenus(res.topMenus);
      menusStore.setLeftMenus(res.leftMenus);
      next({ ...to, replace: true });
    }
  }
});

export default router;
