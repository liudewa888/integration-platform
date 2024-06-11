import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index';
import { getRoute } from '@/api/user';
import { useUserStore } from '@/stores/user';
import { useMenusStore } from '@/stores/menus';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index')
    },
    {
      path: '/',
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

const systemCode = window.appConfig.systemCode;
const MenuTopID = window.appConfig.MenuTopID;

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
      return tree[parentId].map((item) => {
        const node = {};
        node.path = item.Url || '';
        // node.component = item.FuncType === '1' || item.FuncType === '2' ? Layout : Empty;
        node.name = item.FuncCode || '';
        node.funcType = item.FuncType;
        node.parentID = item.ParentID;
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
  const user = userStore.user;
  const data = {
    UserID: user.UserID,
    IsAdmin: user.IsAdmin
  };
  const { menuData } = await getRoute({
    ...data,
    IsAdmin: data.IsAdmin,
    SystemCode: systemCode
  });

  const { menuData: topMenuData } = await getRoute({
    ...data,
    IsAdmin: data.IsAdmin,
    SystemCode: systemCode,
    MenuLevel: 1
  });

  return new Promise((resolve) => {
    let accessedRoutes = [];
    let topMenus = [];
    let leftMenus = [];
    if (menuData) {
      accessedRoutes = filterAsyncRoutes(menuData, MenuTopID).sort((a, b) => {
        return a.meta.seqNo - b.meta.seqNo;
      });
      leftMenus = accessedRoutes.map((item) =>
        item.children.sort((a, b) => {
          return a.meta.seqNo - b.meta.seqNo;
        })
      );
    }
    if (topMenuData) {
      topMenus = filterAsyncRoutes(topMenuData, MenuTopID).sort((a, b) => {
        return a.meta.seqNo - b.meta.seqNo;
      });
    }
    //这一段逻辑狠重要,如果TOP菜单里面有funcType是的2的,那么就遍历路由数据,找到菜单对应的路由数据,并且给加上一个属性menuType,用来标识此菜单不用加入面包屑,在面包屑组件addTags方法判断中使用
    // topMenu.forEach((item) => {
    //   if (item.funcType && item.funcType == 2) {
    //     accessedRoutes.forEach((itemRoutes) => {
    //       if (item.name == itemRoutes.name) {
    //         itemRoutes.meta.menuType = 'noneTags';
    //       }
    //     });
    //   }
    // });
    resolve({ menus: accessedRoutes, leftMenus, topMenus });
  });
};

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const menusStore = useMenusStore();
  if (!userStore.getUser() && to.path !== '/login') {
    next('/login');
  } else {
    if (menusStore.menus && menusStore.menus.length) {
      console.log(menusStore.leftMenus, 'leftMenus');
    } else {
      generateRoutes().then((res) => {
        menusStore.setTopMenus(res.topMenus);
        menusStore.setLeftMenus(res.leftMenus);
      });
    }
    next();
  }
});

export default router;
